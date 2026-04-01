import fetch from 'node-fetch';

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${res.headers.get('content-type')}`);
  } catch (e) {
    console.error(e);
  }
}

checkUrl('https://ci74.ru/wp-content/uploads/2019/12/4314_Image.jpeg');
