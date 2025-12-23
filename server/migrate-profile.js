import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: "server/.env" });

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://mostafa_db_user:nO6ULs3xLb3JLEnV@portfolioexperances.vwqhji2.mongodb.net/";
const dbName = process.env.DB_NAME || "portfolio";
const legacyCollection = process.env.LEGACY_PROFILE_COLLECTION || "profile_data";
const legacyId = process.env.LEGACY_PROFILE_ID || "profile_data";
const profileCollection = process.env.PROFILE_COLLECTION || "profile";
const projectsCollection = process.env.PROJECTS_COLLECTION || "projects";
const experienceCollection = process.env.EXPERIENCE_COLLECTION || "experience";
const profileId = process.env.PROFILE_ID || "profile";

if (!mongoUri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);

async function migrate() {
  await client.connect();
  const db = client.db(dbName);
  const legacy = await db.collection(legacyCollection).findOne({ _id: legacyId });

  if (!legacy) {
    console.error("Legacy profile document not found.");
    return;
  }

  const { projects = [], portfolioSite = {}, ...profileData } = legacy;
  const experiences = portfolioSite.workExperiences || [];
  const { workExperiences, ...portfolioSiteData } = portfolioSite;

  const profilePayload = {
    ...profileData,
    portfolioSite: portfolioSiteData,
    _id: profileId,
  };

  await db.collection(profileCollection).replaceOne({ _id: profileId }, profilePayload, { upsert: true });

  if (Array.isArray(projects)) {
    await db.collection(projectsCollection).deleteMany({});
    if (projects.length) {
      await db.collection(projectsCollection).insertMany(projects);
    }
  }

  if (Array.isArray(experiences)) {
    await db.collection(experienceCollection).deleteMany({});
    if (experiences.length) {
      await db.collection(experienceCollection).insertMany(experiences);
    }
  }

  console.log("Migration complete. Legacy document preserved.");
}

migrate()
  .catch((error) => {
    console.error("Migration failed:", error.message);
  })
  .finally(async () => {
    await client.close();
  });
