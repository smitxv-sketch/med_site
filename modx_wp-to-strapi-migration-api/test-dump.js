import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3010/api/export/developer-dump?city=chelyabinsk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schemaFields: {}, exampleCount: 2 })
  });
  const data = await res.json();
  console.log(Object.keys(data));
  if (data.dump) {
    console.log(Object.keys(data.dump));
    console.log(Object.keys(data.dump.schema));
  }
}

test();
