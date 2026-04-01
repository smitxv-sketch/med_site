import fetch from 'node-fetch';

async function checkMedia() {
  try {
    const res = await fetch('https://ci74.ru/wp-json/wp/v2/media/9082');
    if (res.ok) {
      const data = await res.json();
      console.log('Media 9082 (Недбайло):');
      console.log('Source URL:', data.source_url);
      console.log('GUID:', data.guid?.rendered);
    } else {
      console.log('Failed to fetch media 9082:', res.status);
    }

    const res2 = await fetch('https://ci74.ru/wp-json/wp/v2/media/153277');
    if (res2.ok) {
      const data2 = await res2.json();
      console.log('\nMedia 153277 (Любимова):');
      console.log('Source URL:', data2.source_url);
      console.log('GUID:', data2.guid?.rendered);
    } else {
      console.log('Failed to fetch media 153277:', res2.status);
    }
  } catch (e) {
    console.error(e);
  }
}

checkMedia();
