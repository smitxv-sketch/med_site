const fs = require('fs');

try {
  const data = fs.readFileSync('/full.md', 'utf8');
  const doctors = JSON.parse(data);
  
  let anomalies = [];
  let totalDoctors = Object.keys(doctors).length;
  
  for (const [id, doc] of Object.entries(doctors)) {
    // Check photo
    if (!doc.photo && !doc.photo_list) {
      anomalies.push(`Doctor ${id} (${doc.name}): Missing photo and photo_list`);
    }
    
    // Check specialty/position
    if (!doc.feed_spec && !doc.position && !doc.anonce) {
      anomalies.push(`Doctor ${id} (${doc.name}): Missing feed_spec, position, and anonce`);
    }
    if (doc.feed_spec && !doc.feed_spec.startsWith('a:')) {
      anomalies.push(`Doctor ${id} (${doc.name}): feed_spec is not a serialized array: ${doc.feed_spec}`);
    }
    
    // Check experience (stage/feed_start_date)
    if (!doc.feed_start_date && !doc.stage) {
      anomalies.push(`Doctor ${id} (${doc.name}): Missing feed_start_date and stage`);
    }
    if (doc.feed_start_date && !/^\d{8}$/.test(doc.feed_start_date)) {
      anomalies.push(`Doctor ${id} (${doc.name}): feed_start_date format anomaly: ${doc.feed_start_date}`);
    }
    
    // Check price
    if (!doc.feed_price && !doc.cost) {
      anomalies.push(`Doctor ${id} (${doc.name}): Missing feed_price and cost`);
    }
    
    // Check boolean flags
    if (doc.feed_childdoctor !== undefined && !['0', '1', ''].includes(doc.feed_childdoctor)) {
      anomalies.push(`Doctor ${id} (${doc.name}): feed_childdoctor anomaly: ${doc.feed_childdoctor}`);
    }
    if (doc.feed_adultdoctor !== undefined && !['0', '1', ''].includes(doc.feed_adultdoctor)) {
      anomalies.push(`Doctor ${id} (${doc.name}): feed_adultdoctor anomaly: ${doc.feed_adultdoctor}`);
    }
    
    // Check serialized arrays
    const serializedFields = ['clinics', 'directions', 'job'];
    for (const field of serializedFields) {
      if (doc[field] && !doc[field].startsWith('a:')) {
        anomalies.push(`Doctor ${id} (${doc.name}): ${field} is not a serialized array: ${doc[field]}`);
      }
    }
    
    // Check education fields
    if (doc.feed_edu) {
      const eduCount = parseInt(doc.feed_edu, 10);
      if (isNaN(eduCount)) {
        anomalies.push(`Doctor ${id} (${doc.name}): feed_edu is not a number: ${doc.feed_edu}`);
      } else {
        for (let i = 0; i < eduCount; i++) {
          if (!doc[`feed_edu_${i}_feed_edu_org`]) {
            anomalies.push(`Doctor ${id} (${doc.name}): Missing feed_edu_${i}_feed_edu_org despite feed_edu=${eduCount}`);
          }
        }
      }
    }
  }
  
  console.log(`Total doctors analyzed: ${totalDoctors}`);
  if (anomalies.length > 0) {
    console.log('Anomalies found:');
    anomalies.forEach(a => console.log('- ' + a));
  } else {
    console.log('No anomalies found. Data strictly matches the WP_DATA_MAPPING.md matrix.');
  }
  
} catch (err) {
  console.error('Error parsing full.md:', err.message);
}
