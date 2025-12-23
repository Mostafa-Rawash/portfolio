import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { readFile } from "fs/promises";
import path from "path";

dotenv.config({ path: "server/.env" });

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "portfolio";
const profileCollection = process.env.PROFILE_COLLECTION || "profile";
const projectsCollection = process.env.PROJECTS_COLLECTION || "projects";
const experienceCollection = process.env.EXPERIENCE_COLLECTION || "experience";
const legacyCollection = process.env.LEGACY_PROFILE_COLLECTION || "profile_data";
const legacyId = process.env.LEGACY_PROFILE_ID || "profile_data";
const profileId = process.env.PROFILE_ID || "profile";

if (!mongoUri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);

function buildExperience(data) {
  const siteExperiences = data?.portfolioSite?.workExperiences || [];
  if (siteExperiences.length) {
    return siteExperiences;
  }
  const legacy = data?.experience || [];
  return legacy
    .flatMap((entry) => {
      const roles = Array.isArray(entry.roles) ? entry.roles : [];
      return roles.map((role) => ({
        company: entry.company || "",
        title: role.title || "",
        period: [role.startDate, role.endDate].filter(Boolean).join(" - "),
        achievements: role.description ? [role.description] : [],
      }));
    })
    .filter((item) => item.company || item.title);
}

async function migrate() {
  await client.connect();
  const db = client.db(dbName);
  const filePath = path.resolve("server/migrations/profile_data.json");
  const raw = await readFile(filePath, "utf-8");
  const data = JSON.parse(raw);

  await db.collection(legacyCollection).replaceOne({ _id: legacyId }, { ...data, _id: legacyId }, { upsert: true });

  const projects = Array.isArray(data.projects) ? data.projects : [];
  const experiences = buildExperience(data);
  const { projects: _projects, experience: _experience, ...rest } = data;
  const { workExperiences, ...portfolioSite } = rest.portfolioSite || {};

  const profilePayload = {
    ...rest,
    portfolioSite,
    _id: profileId,
  };

  await db.collection(profileCollection).replaceOne({ _id: profileId }, profilePayload, { upsert: true });

  await db.collection(projectsCollection).deleteMany({});
  if (projects.length) {
    await db.collection(projectsCollection).insertMany(projects);
  }

  await db.collection(experienceCollection).deleteMany({});
  if (experiences.length) {
    await db.collection(experienceCollection).insertMany(experiences);
  }

  console.log("Profile data migration complete.");
}

migrate()
  .catch((error) => {
    console.error("Profile data migration failed:", error.message);
  })
  .finally(async () => {
    await client.close();
  });
