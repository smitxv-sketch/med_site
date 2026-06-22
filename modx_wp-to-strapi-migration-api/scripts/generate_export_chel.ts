import fs from 'fs/promises';
import path from 'path';
import { 
  getChelDoctors, 
  getChelServices, 
  getChelReviews, 
  getChelNews, 
  getChelVacancies, 
  getChelClinics, 
  getChelArticles, 
  getChelFaq, 
  getChelAdvantages, 
  getChelAnonces,
  getChelDirections
} from '../server/services/wpService.js';

const EXPORT_DIR = path.join(process.cwd(), 'public', 'export', 'chel');

async function writeJson(filename: string, data: any) {
  await fs.writeFile(path.join(EXPORT_DIR, filename), JSON.stringify(data, null, 2));
  console.log(`Created ${filename}`);
}

async function writeText(filename: string, text: string) {
  await fs.writeFile(path.join(EXPORT_DIR, filename), text);
  console.log(`Created ${filename}`);
}

async function runExport() {
  try {
    const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
    const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 10000;

    await fs.rm(EXPORT_DIR, { recursive: true, force: true });
    await fs.mkdir(EXPORT_DIR, { recursive: true });
    console.log(`Exporting Chelyabinsk data to ${EXPORT_DIR} (Limit: ${limit})...`);

    // Fetch all entities
    const [
      doctors,
      services,
      reviews,
      news,
      vacancies,
      clinics,
      articles,
      faq,
      advantages,
      anonces,
      directions
    ] = await Promise.all([
      getChelDoctors(),
      getChelServices(limit, 0),
      getChelReviews(limit, 0),
      getChelNews(limit, 0),
      getChelVacancies(limit, 0),
      getChelClinics(),
      getChelArticles(),
      getChelFaq(limit, 0),
      getChelAdvantages(),
      getChelAnonces(),
      getChelDirections()
    ]);

    // Apply limit to doctors, clinics, articles, advantages, anonces since they don't have limit params in wpService
    const limitedDoctors = doctors.slice(0, limit);
    const limitedClinics = clinics.slice(0, limit);
    const limitedArticles = articles.slice(0, limit);
    const limitedAdvantages = advantages.slice(0, limit);
    const limitedAnonces = anonces.slice(0, limit);

    // Generate relationships
    const relationships: any[] = [];
    
    reviews.forEach((r: any) => {
      if (r.doctor_id) {
        relationships.push({ source_id: r.id, source_type: 'review', target_id: r.doctor_id, target_type: 'doctor', type: 'review_to_doctor' });
      }
      if (r.service_id) {
        relationships.push({ source_id: r.id, source_type: 'review', target_id: r.service_id, target_type: 'service', type: 'review_to_service' });
      }
      if (r.directions) {
        const dirs = Array.isArray(r.directions) ? r.directions : String(r.directions).split(',');
        dirs.forEach((d: string) => {
          if (d.trim()) {
            relationships.push({ source_id: r.id, source_type: 'review', target_id: d.trim(), target_type: 'direction', type: 'review_to_direction' });
          }
        });
      }
    });

    services.forEach((s: any) => {
      if (s.taxonomies?.directions) {
        s.taxonomies.directions.forEach((d: any) => {
          relationships.push({ source_id: s.id, source_type: 'service', target_id: d.term_id, target_type: 'direction', type: 'service_to_direction' });
        });
      }
    });

    const dump = {
      _meta: {
        description: "Дамп структуры данных для переноса на Strapi (Челябинск)",
        generated_at: new Date().toISOString(),
        note: "В этом дампе собраны примеры данных и связи для Челябинска."
      },
      schema: {
        doctors: { collectionName: "doctors", info: { singularName: "doctor", pluralName: "doctors", displayName: "Врачи" }, attributes: Object.keys(limitedDoctors[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        services: { collectionName: "services", info: { singularName: "service", pluralName: "services", displayName: "Услуги" }, attributes: Object.keys(services[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        reviews: { collectionName: "reviews", info: { singularName: "review", pluralName: "reviews", displayName: "Отзывы" }, attributes: Object.keys(reviews[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        news: { collectionName: "news", info: { singularName: "news", pluralName: "news", displayName: "Новости" }, attributes: Object.keys(news[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        vacancies: { collectionName: "vacancies", info: { singularName: "vacancy", pluralName: "vacancies", displayName: "Вакансии" }, attributes: Object.keys(vacancies[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        clinics: { collectionName: "clinics", info: { singularName: "clinic", pluralName: "clinics", displayName: "Клиники" }, attributes: Object.keys(limitedClinics[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        articles: { collectionName: "articles", info: { singularName: "article", pluralName: "articles", displayName: "Статьи" }, attributes: Object.keys(limitedArticles[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        faq: { collectionName: "faq", info: { singularName: "faq", pluralName: "faq", displayName: "Вопрос-ответ" }, attributes: Object.keys(faq[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        advantages: { collectionName: "advantages", info: { singularName: "advantage", pluralName: "advantages", displayName: "Преимущества" }, attributes: Object.keys(limitedAdvantages[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        anonces: { collectionName: "anonces", info: { singularName: "anonce", pluralName: "anonces", displayName: "Анонсы" }, attributes: Object.keys(limitedAnonces[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
        directions: { collectionName: "directions", info: { singularName: "direction", pluralName: "directions", displayName: "Направления" }, attributes: Object.keys(directions[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) }
      },
      relationships,
      data_examples: {
        doctors: limitedDoctors,
        services: services,
        reviews: reviews,
        news: news,
        vacancies: vacancies,
        clinics: limitedClinics,
        articles: limitedArticles,
        faq: faq,
        advantages: limitedAdvantages,
        anonces: limitedAnonces,
        directions: directions
      }
    };

    await writeJson('full_dump.json', dump);

    const migrationGuide = `# MIGRATION CONTEXT & DATA DICTIONARY (CHELYABINSK)
Generated: ${new Date().toISOString()}

## OVERVIEW
This directory contains the data export for the Chelyabinsk branch (ci74.ru), which operates on WordPress.
Data extraction relies on direct database queries to the WordPress database, except for doctors which use a dedicated REST API endpoint.

## ENTITIES EXPORTED
*   **full_dump.json**: Единый файл, содержащий мета-информацию, схему данных (schema), связи (relationships) и примеры данных (data_examples) для всех сущностей (Врачи, Услуги, Отзывы, Новости, Вакансии, Клиники, Статьи, Вопрос-ответ, Преимущества, Анонсы, Направления).

## CHELYABINSK DOCTORS INTEGRATION (ci74.ru)
For migrating or synchronizing doctor data from the Chelyabinsk branch (WordPress), use the dedicated REST endpoint.

*   **URL (Endpoint):** \`https://ci74.ru/api/rest.php?action=get_doctors\`
*   **Method:** \`GET\`
*   **Response Format:** \`JSON Array\`

### Payload Schema
*   \`wp_user_id\` *(String/Int)* — Unique legacy ID in WordPress.
*   \`display_name\` *(String)* — Full name.
*   \`qms_id\` *(String)* — **CRITICAL FIELD.** ID in the Medical Information System (MIS). May contain multiple IDs separated by commas.
*   \`specialty\` *(String)* — Main specialty.
*   \`photo_url\` *(String)* — Direct link to the photo.
*   \`experience_years\` *(String/Int)* — Years of experience.
*   \`price\` *(String/Int)* — Base appointment price.
*   \`duration\` *(String/Int)* — Appointment duration in minutes.
*   \`category\`, \`degree\`, \`zvanie\`, \`position\` *(String)* — Rank and position details.
*   \`is_child_doctor\`, \`is_adult_doctor\` *(Boolean/Int)* — Patient age flags.
*   \`education_history\`, \`badges\`, \`raw_meta\` *(JSON String)* — Serialized JSON arrays/objects.
*   \`education_text\`, \`description\`, \`anonce\`, \`activities\` *(String)* — Text fields.

### Strapi Architect Instructions for Chelyabinsk
1.  **ID Mapping:** Save \`wp_user_id\` in Strapi (e.g., as \`legacy_id\`) to prevent duplicates during re-sync.
2.  **QMS ID Handling:** Save \`qms_id\` as a string (or an array of strings split by comma). The frontend relies on this to fetch available slots from the MIS.
3.  **JSON Parsing:** \`education_history\`, \`badges\`, and \`raw_meta\` arrive as strings. The import script MUST parse them (\`JSON.parse()\`) and map them to Strapi \`JSON\` or \`Component\` fields.
4.  **Media Files:** Photos arrive as URLs (\`photo_url\`). The import script must download these images and upload them to the Strapi Media Library, linking them to the created Doctor entity.
5.  **Relations:** 
    *   Use \`relationships.json\` to link entities together.
    *   \`review_to_doctor\`: Links a review to a doctor (using doctor's \`wp_user_id\`).
    *   \`review_to_service\`: Links a review to a service (using service's internal ID or QMS ID).
    *   \`review_to_direction\`: Links a review to a direction (using direction's \`term_id\`).
    *   \`service_to_direction\`: Links a service to a direction (using direction's \`term_id\`).
`;

    await writeText('MIGRATION_GUIDE.md', migrationGuide);

    console.log("Chelyabinsk export complete!");
    process.exit(0);
  } catch (error) {
    console.error("Export failed:", error);
    process.exit(1);
  }
}

runExport();
