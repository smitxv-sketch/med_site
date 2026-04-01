import fetch from 'node-fetch';

async function checkApi() {
  try {
    const res = await fetch('http://localhost:3000/api/wp-doctors');
    const data = await res.json();
    
    console.log(`Total WP doctors: ${data.length}`);
    
    const targetNames = ['Любимова', 'Недбайло'];
    
    for (const doc of data) {
      if (targetNames.some(target => doc.display_name.includes(target))) {
        console.log(`\n--- Врач: ${doc.display_name} (ID: ${doc.ID}) ---`);
        console.log('Photo URL:', doc.photo_url);
        console.log('Raw Meta Photo:', doc.rawMeta?.photo);
        console.log('Raw Meta Photo List:', doc.rawMeta?.photo_list);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

checkApi();
