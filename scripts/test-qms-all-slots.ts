import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function makeRequest(endpoint: string, params: Record<string, string>) {
  let proxyUrl = process.env.QMS_CHEL_ADDRESS;
  let apiKey = process.env.QMS_CHEL_API_KEY;
  
  if (!proxyUrl || !apiKey) {
    try {
      const res = await axios.get('http://localhost:3000/api/diagnostics/env');
      proxyUrl = res.data.address;
      apiKey = res.data.key;
    } catch (e) {
      // Ignore
    }
  }
  
  if (!proxyUrl || !apiKey) {
    throw new Error('Missing QMS_CHEL_ADDRESS or QMS_CHEL_API_KEY in .env or server');
  }

  let url = proxyUrl;
  if (!url.startsWith('http')) url = `https://${url}`;
  
  let baseUrl = url;
  if (baseUrl.includes('?endpoint=')) baseUrl = baseUrl.replace('?endpoint=', '');
  const separator = baseUrl.includes('?') ? '&' : '?';
  url = `${baseUrl}${separator}endpoint=${endpoint}`;
  
  const finalParams = new URLSearchParams();
  finalParams.append('apikey', apiKey);
  for (const [key, value] of Object.entries(params)) {
    finalParams.append(key, value);
  }
  
  const response = await axios.post(url, finalParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': apiKey,
        'apikey': apiKey
      }
  });
  
  return response.data;
}

async function fetchAllSlots() {
  console.log('Starting full slots fetch...');
  const startTime = Date.now();
  
  try {
    // Step 1: Get all specialties
    console.log('1. Fetching specialties list...');
    const specResponse = await makeRequest('spec_list', { qqc244: '' });
    const specs = specResponse.spec || [];
    console.log(`Found ${specs.length} specialties.`);
    
    if (specs.length === 0) {
      console.log('No specialties found. Exiting.');
      return;
    }

    const allData: any[] = [];
    let totalDoctors = 0;
    let totalSlots = 0;

    // Step 2: Get slots for each specialty
    console.log('2. Fetching slots for each specialty (this may take a while)...');
    
    // Write initial array bracket
    const outputPath = path.resolve(process.cwd(), 'qms_all_slots_dump.json');
    fs.writeFileSync(outputPath, '[\n');
    let isFirst = true;
    
    // Process in batches of 5 to speed it up
    const batchSize = 5;
    for (let i = 0; i < specs.length; i += batchSize) {
      const batch = specs.slice(i, i + batchSize);
      console.log(`   Processing batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(specs.length/batchSize)}...`);
      
      const promises = batch.map(async (spec) => {
        try {
          const response = await makeRequest('getslotsbyspec', {
            chatid: '999',
            spec: spec
          });
          
          if (response && response.slots && Array.isArray(response.slots)) {
            const docBlocks = response.slots;
            totalDoctors += docBlocks.length;
            
            // Now fetch available days for each doctor
            for (const doc of docBlocks) {
              try {
                const branchCode = doc.qqc ? doc.qqc.substring(0, 3) : '';
                
                // Fetch days
                const daysResponse = await makeRequest('getslotsbyspec', {
                  chatid: '999',
                  spec: spec,
                  qqc244: doc.qqc,
                  qqc244branch: branchCode
                });
                
                if (daysResponse && daysResponse.slots && Array.isArray(daysResponse.slots)) {
                  // The days response doesn't have qqc, it's just an array with an object containing dates
                  const daysObj = daysResponse.slots[0];
                  if (daysObj) {
                    doc.available_days = daysObj;
                    doc.all_slots = [];
                    
                    const daysToFetch: string[] = [];
                    for (const key of Object.keys(daysObj)) {
                      if (key.match(/^\d{8}$/)) {
                        daysToFetch.push(key);
                      }
                    }
                    
                    // Fetch slots for each day (limit to first 7 days to avoid millions of requests)
                    const limitedDays = daysToFetch.slice(0, 7);
                    
                    for (const day of limitedDays) {
                      try {
                        const timeResponse = await makeRequest('getslotsbyspec', {
                          chatid: '999',
                          spec: spec,
                          qqc244: doc.qqc,
                          qqc244branch: branchCode,
                          day: day
                        });
                        
                        if (timeResponse && timeResponse.slots && Array.isArray(timeResponse.slots)) {
                          const timeBlock = timeResponse.slots.find((b: any) => b.qqc === doc.qqc) || timeResponse.slots[0];
                          if (timeBlock && timeBlock.schedule) {
                            doc.all_slots.push(...timeBlock.schedule);
                            totalSlots += timeBlock.schedule.length;
                          }
                        }
                      } catch (e: any) {
                        console.error(`     Error fetching times for doctor ${doc.fio} on day ${day}:`, e.message);
                      }
                    }
                  }
                }
              } catch (e: any) {
                console.error(`     Error fetching days for doctor ${doc.fio}:`, e.message);
              }
            }
            
            return {
              specialty: spec,
              doctors: docBlocks
            };
          }
        } catch (err: any) {
          console.error(`   Error fetching ${spec}:`, err.message);
        }
        return null;
      });
      
      const results = await Promise.all(promises);
      
      for (const res of results) {
        if (res) {
          allData.push(res);
          const jsonStr = JSON.stringify(res, null, 2);
          fs.appendFileSync(outputPath, (isFirst ? '' : ',\n') + jsonStr);
          isFirst = false;
        }
      }
    }
    
    // Close array bracket
    fs.appendFileSync(outputPath, '\n]');

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n--- SUMMARY ---');
    console.log(`Time taken: ${duration} seconds`);
    console.log(`Total specialties processed: ${specs.length}`);
    console.log(`Total doctors found: ${totalDoctors}`);
    console.log(`Total slots found: ${totalSlots}`);
    
    console.log(`\nFull data saved to: ${outputPath}`);
    
  } catch (e: any) {
    console.error('Fatal Error:', e.message);
  }
}

fetchAllSlots().catch(console.error);
