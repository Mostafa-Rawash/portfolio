import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { readFile } from "fs/promises";
import path from "path";

dotenv.config({ path: "server/.env" });

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "portfolio";
const projectsCollection = process.env.PROJECTS_COLLECTION || "projects";

if (!mongoUri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);

async function migrate() {
  await client.connect();
  const db = client.db(dbName);
  const filePath = path.resolve("server/migrations/projects.json");
  const raw = await readFile(filePath, "utf-8");
  const projects = JSON.parse(raw);

  if (!Array.isArray(projects)) {
    throw new Error("Projects JSON must be an array.");
  }

  await db.collection(projectsCollection).deleteMany({});
  if (projects.length) {
    await db.collection(projectsCollection).insertMany(projects);
  }

  console.log(`Projects migration complete. Inserted: ${projects.length}`);
}

migrate()
  .catch((error) => {
    console.error("Projects migration failed:", error.message);
  })
  .finally(async () => {
    await client.close();
  });
