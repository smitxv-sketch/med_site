import fetch from 'node-fetch';

async function checkApi() {
  try {
    const res = await fetch('http://localhost:3000/api/doctors?city=chelyabinsk');
    const data = await res.json();
    
    const targetNames = ['Любимова', 'Недбайло'];
    
    for (const doc of data) {
      if (targetNames.some(target => doc.name.includes(target))) {
        console.log(`\n--- Врач: ${doc.name} (ID: ${doc.id}) ---`);
        console.log('Image:', doc.image);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

checkApi();
