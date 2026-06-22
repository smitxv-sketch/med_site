import fetch from 'node-fetch';

async function runTests() {
  console.log("🚀 Запуск автоматического тестирования API эндпоинтов...\n");
  const baseUrl = 'http://localhost:3010';
  const endpoints = [
    // OpenAPI
    '/api/explore/openapi.json',
    
    // Explore SPb
    '/api/explore/spb/doctors?limit=1',
    '/api/explore/spb/services?limit=1',
    '/api/explore/spb/prices?limit=1',
    '/api/explore/spb/reviews?limit=1',
    
    // Explore Chel
    '/api/explore/chel/doctors?limit=1',
    '/api/explore/chel/services?limit=1',
    '/api/explore/chel/directions?limit=1',
    '/api/explore/chel/reviews?limit=1',
    
    // Discovery Endpoints
    '/api/explore/spb/templates',
    '/api/explore/spb/content/15?limit=1',
    '/api/explore/chel/post_types',
    '/api/explore/chel/posts/page?limit=1',
    
    // QA Endpoints
    '/api/qa/spb/services?limit=1',
    '/api/qa/chel/services/891',
    '/api/qa/chel/directions',
    '/api/qa/spb/doctors/78',
    '/api/qa/spb/price_items'
  ];

  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    try {
      const res = await fetch(baseUrl + ep);
      if (res.ok) {
        const data = await res.json();
        const preview = JSON.stringify(data).substring(0, 60) + '...';
        console.log(`✅ [PASS] ${ep}`);
        console.log(`   -> Status: ${res.status} | Data preview: ${preview}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${ep}`);
        console.error(`   -> Status: ${res.status} | Text: ${await res.text()}`);
        failed++;
      }
    } catch (e: any) {
      console.error(`❌ [ERROR] ${ep}`);
      console.error(`   -> Exception: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Итоги тестирования: Успешно: ${passed}, Ошибок: ${failed}`);
}

runTests();
