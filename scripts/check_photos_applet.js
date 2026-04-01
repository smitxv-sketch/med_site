const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('/app/applet/full.md', 'utf8'));
  
  const targetNames = ['Любимова', 'Недбайло'];
  const photoKeys = ['photo', 'photo_list', 'avatar', 'profile_picture', 'cupp_upload_meta', 'wp_user_avatar', 'user_avatar', 'image', 'picture', 'thumbnail'];
  
  for (const [id, doc] of Object.entries(data)) {
    const name = doc.name || doc.firstname || doc.lastname || doc.nickname || '';
    
    if (targetNames.some(target => name.includes(target))) {
      console.log(`\n--- Врач: ${name} (ID: ${id}) ---`);
      let foundPhoto = false;
      for (const key of photoKeys) {
        if (doc[key] !== undefined && doc[key] !== '') {
          console.log(`${key}:`, doc[key]);
          foundPhoto = true;
        }
      }
      if (!foundPhoto) {
        console.log('Нет данных о фото в известных полях.');
      }
    }
  }
} catch (e) {
  console.error(e);
}
