import { dbChel } from './server/dbChel.js';

async function analyze() {
  try {
    const [services]: any = await dbChel.query("SELECT ID, post_title, post_name FROM wp_posts WHERE post_type = 'services' AND post_status = 'publish' LIMIT 5");
    
    if (services.length === 0) {
      console.log("No services found.");
      process.exit(0);
    }
    
    const serviceIds = services.map((s: any) => s.ID);
    
    const [meta]: any = await dbChel.query(`SELECT post_id, meta_key, meta_value FROM wp_postmeta WHERE post_id IN (${serviceIds.join(',')})`);
    
    const [tax]: any = await dbChel.query(`
      SELECT tr.object_id, tt.taxonomy, t.name 
      FROM wp_term_relationships tr 
      JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id 
      JOIN wp_terms t ON tt.term_id = t.term_id 
      WHERE tr.object_id IN (${serviceIds.join(',')})
    `);

    console.log("=== SERVICES SAMPLE ===");
    console.log(services);
    
    console.log("\n=== META KEYS FOUND ===");
    const metaKeys = [...new Set(meta.map((m: any) => m.meta_key))].filter((k: string) => !k.startsWith('_edit_') && !k.startsWith('_oembed_'));
    console.log(metaKeys);
    
    console.log("\n=== TAXONOMIES FOUND ===");
    const taxonomies = [...new Set(tax.map((t: any) => t.taxonomy))];
    console.log(taxonomies);
    
    console.log("\n=== SAMPLE META VALUES FOR ID " + serviceIds[0] + " ===");
    const sampleMeta = meta.filter((m: any) => m.post_id === serviceIds[0] && !m.meta_key.startsWith('_edit_'));
    sampleMeta.forEach((m: any) => {
        const val = m.meta_value.length > 100 ? m.meta_value.substring(0, 100) + '...' : m.meta_value;
        console.log(`${m.meta_key}: ${val}`);
    });

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
analyze();
