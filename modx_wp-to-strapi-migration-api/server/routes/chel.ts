import { Router } from "express";
import { getChelDoctors, getChelServices, getChelReviews, getChelNews, getChelVacancies, getChelClinics, getChelArticles, getChelFaq, getChelAdvantages, getChelAnonces } from "../services/wpService.js";
import { dbChel } from "../dbChel.js";

const router = Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await getChelDoctors();
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching Chelyabinsk doctors:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk doctors" });
  }
});

router.get("/services", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const services = await getChelServices(limit, offset);
    res.json(services);
  } catch (error) {
    console.error("Error fetching Chelyabinsk services:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk services" });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const reviews = await getChelReviews(limit, offset);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching Chelyabinsk reviews:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk reviews" });
  }
});

router.get("/news", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;
    const news = await getChelNews(limit, offset);
    res.json(news);
  } catch (error) {
    console.error("Error fetching Chelyabinsk news:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk news" });
  }
});

router.get("/vacancies", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;
    const vacancies = await getChelVacancies(limit, offset);
    res.json(vacancies);
  } catch (error) {
    console.error("Error fetching Chelyabinsk vacancies:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk vacancies" });
  }
});

router.get("/clinics", async (req, res) => {
  try {
    const clinics = await getChelClinics();
    res.json(clinics);
  } catch (error) {
    console.error("Error fetching Chelyabinsk clinics:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk clinics" });
  }
});

router.get("/articles", async (req, res) => {
  try {
    const articles = await getChelArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching Chelyabinsk articles:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk articles" });
  }
});

router.get("/faq", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;
    const faq = await getChelFaq(limit, offset);
    res.json(faq);
  } catch (error) {
    console.error("Error fetching Chelyabinsk FAQ:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk FAQ" });
  }
});

router.get("/advantages", async (req, res) => {
  try {
    const advantages = await getChelAdvantages();
    res.json(advantages);
  } catch (error) {
    console.error("Error fetching Chelyabinsk advantages:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk advantages" });
  }
});

router.get("/anonces", async (req, res) => {
  try {
    const anonces = await getChelAnonces();
    res.json(anonces);
  } catch (error) {
    console.error("Error fetching Chelyabinsk anonces:", error);
    res.status(500).json({ error: "Failed to fetch Chelyabinsk anonces" });
  }
});

router.get("/dump", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 2;
    
    // Сначала получаем список всех таблиц
    const [tablesResult] = await dbChel.query('SHOW TABLES');
    const tables = (tablesResult as any[]).map(row => Object.values(row)[0] as string);
    
    const dump: Record<string, any> = {};
    
    // Проходим по каждой таблице и берем примеры
    for (const table of tables) {
      try {
        const [rows] = await dbChel.query(`SELECT * FROM ?? LIMIT ?`, [table, limit]);
        dump[table] = rows;
      } catch (e) {
        dump[table] = { error: "Could not fetch data" };
      }
    }
    
    res.json(dump);
  } catch (error) {
    console.error("Error generating Chelyabinsk dump:", error);
    res.status(500).json({ error: "Failed to generate dump" });
  }
});

export default router;
