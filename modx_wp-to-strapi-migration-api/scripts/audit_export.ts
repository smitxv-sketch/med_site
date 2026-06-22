import fs from 'fs/promises';
import path from 'path';

const CHEL_DIR = path.join(process.cwd(), 'public', 'export', 'chel');

async function audit() {
  console.log('--- AUDIT CHELYABINSK EXPORT ---');
  try {
    const doctors = JSON.parse(await fs.readFile(path.join(CHEL_DIR, 'doctors.json'), 'utf-8'));
    const services = JSON.parse(await fs.readFile(path.join(CHEL_DIR, 'services.json'), 'utf-8'));
    const reviews = JSON.parse(await fs.readFile(path.join(CHEL_DIR, 'reviews.json'), 'utf-8'));

    console.log(`Loaded: ${doctors.length} doctors, ${services.length} services, ${reviews.length} reviews.`);

    // Check Reviews -> Doctors
    let reviewsWithDoctors = 0;
    let validDoctorLinks = 0;
    let invalidDoctorLinks = 0;

    const doctorIds = new Set(doctors.map((d: any) => String(d.id)));

    reviews.forEach((r: any) => {
      if (r.doctor_id) {
        reviewsWithDoctors++;
        if (doctorIds.has(String(r.doctor_id))) {
          validDoctorLinks++;
        } else {
          invalidDoctorLinks++;
        }
      }
    });

    console.log(`\nReviews -> Doctors:`);
    console.log(`- Reviews with doctor_id: ${reviewsWithDoctors}`);
    console.log(`- Valid links (doctor exists): ${validDoctorLinks}`);
    console.log(`- Broken links (doctor not found): ${invalidDoctorLinks}`);

    // Check Reviews -> Services
    let reviewsWithServices = 0;
    let validServiceLinks = 0;
    let invalidServiceLinks = 0;

    const serviceIds = new Set(services.map((s: any) => String(s.id)));
    const serviceQmsIds = new Set(services.map((s: any) => String(s.article))); // Assuming article might be QMS ID

    reviews.forEach((r: any) => {
      if (r.service_id) {
        reviewsWithServices++;
        if (serviceIds.has(String(r.service_id)) || serviceQmsIds.has(String(r.service_id))) {
          validServiceLinks++;
        } else {
          invalidServiceLinks++;
        }
      }
    });

    console.log(`\nReviews -> Services:`);
    console.log(`- Reviews with service_id: ${reviewsWithServices}`);
    console.log(`- Valid links (service exists by ID or QMS ID): ${validServiceLinks}`);
    console.log(`- Broken links: ${invalidServiceLinks}`);

  } catch (e) {
    console.error('Audit failed:', e);
  }
}

audit();
