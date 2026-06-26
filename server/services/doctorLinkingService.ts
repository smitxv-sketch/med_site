import { qmsDriver } from '../drivers/QmsDriver.js';
import { getWpDoctors } from './wpService.js';
import axios from 'axios';

const CHEL_API_ENDPOINT = process.env.CHEL_API_ENDPOINT || 'https://ci74.ru/api/rest.php';

export const getLinkingSuggestions = async (city: string = 'chel') => {
  // Fetch all MIS doctors
  const misDoctors = await qmsDriver.getDoctors(city);
  
  // Fetch all WP doctors
  const wpDoctors = await getWpDoctors();
  
  // Normalize strings for comparison
  const normalize = (str: string) => (str || '').trim().toLowerCase().replace(/\s+/g, ' ');

  // Filter out WP doctors that already have a qms_id
  const unlinkedWpDoctors = wpDoctors.filter(d => !d.qms_id);
  
  // Create a set of all linked qms_ids
  const linkedQmsIds = new Set<string>();
  wpDoctors.forEach(d => {
    if (d.qms_id) {
      d.qms_id.split(',').forEach((id: string) => linkedQmsIds.add(id.trim()));
    }
  });
  
  // Filter out MIS doctors that are already linked
  const unlinkedMisDoctors = misDoctors.filter(d => !linkedQmsIds.has(d.id));
  
  const suggestions = [];
  
  for (const wpDoc of unlinkedWpDoctors) {
    const wpName = normalize(wpDoc.display_name);
    
    let bestMatch = null;
    let highestScore = 0;
    
    for (const misDoc of unlinkedMisDoctors) {
      const misName = normalize(misDoc.name);
      
      // Calculate similarity score (simple word overlap for now)
      const wpWords = wpName.split(' ');
      const misWords = misName.split(' ');
      
      let matches = 0;
      for (const w of wpWords) {
        if (misWords.includes(w)) matches++;
      }
      
      const score = matches / Math.max(wpWords.length, misWords.length);
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = misDoc;
      }
    }
    
    if (bestMatch && highestScore > 0.3) { // Threshold
      suggestions.push({
        wpDoctor: wpDoc,
        misDoctor: bestMatch,
        confidence: highestScore
      });
    }
  }
  
  // Sort by confidence descending
  suggestions.sort((a, b) => b.confidence - a.confidence);
  
  return {
    suggestions,
    unlinkedWpCount: unlinkedWpDoctors.length,
    unlinkedMisCount: unlinkedMisDoctors.length,
    totalWpCount: wpDoctors.length,
    totalMisCount: misDoctors.length,
    linkedCount: wpDoctors.length - unlinkedWpDoctors.length
  };
};

export const linkDoctor = async (wpUserId: number, qmsId: string) => {
  try {
    const response = await axios.post(`${CHEL_API_ENDPOINT}?action=link_doctor`, {
      wp_user_id: wpUserId,
      qms_id: qmsId
    }, { timeout: 10000 });

    if (response.data && response.data.success) {
      return { success: true };
    } else {
      throw new Error(response.data?.error || 'Failed to link doctor via API');
    }
  } catch (error: any) {
    console.error('Failed to link doctor:', error.message);
    throw new Error('API request failed: ' + error.message);
  }
};
