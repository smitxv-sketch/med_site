import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function test() {
  const proxyUrl = process.env.QMS_CHEL_ADDRESS;
  const apiKey = process.env.QMS_CHEL_API_KEY;
  
  if (!proxyUrl || !apiKey) {
    console.error('Missing QMS_CHEL_ADDRESS or QMS_CHEL_API_KEY in .env');
    return;
  }

  let url = proxyUrl;
  if (!url.startsWith('http')) url = `https://${url}`;
  
  let baseUrl = url;
  if (baseUrl.includes('?endpoint=')) baseUrl = baseUrl.replace('?endpoint=', '');
  const separator = baseUrl.includes('?') ? '&' : '?';
  url = `${baseUrl}${separator}endpoint=getslotsbyspec`;
  
  const finalParams = new URLSearchParams();
  finalParams.append('apikey', apiKey);
  finalParams.append('chatid', '999');
  finalParams.append('spec', 'Врач общей практики (семейный врач)');
  
  try {
    const response = await axios.post(url, finalParams.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': apiKey,
          'apikey': apiKey
        }
    });
    console.log(JSON.stringify(response.data, null, 2));
  } catch (e: any) {
    console.error(e.message);
  }
}

test().catch(console.error);
