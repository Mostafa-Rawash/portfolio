import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config({ path: "server/.env" });

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5174;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://mostafa_db_user:nO6ULs3xLb3JLEnV@portfolioexperances.vwqhji2.mongodb.net/";
const dbName = process.env.DB_NAME || "portfolio";
const profileCollection = process.env.PROFILE_COLLECTION || "profile";
const projectsCollection = process.env.PROJECTS_COLLECTION || "projects";
const experienceCollection = process.env.EXPERIENCE_COLLECTION || "experience";
const blogsCollection = process.env.BLOGS_COLLECTION || "blogs";
const profileId = process.env.PROFILE_ID || "profile";
const adminToken = process.env.ADMIN_TOKEN || "nO6ULs3xLb3JLEnV";

const linkedInToken = process.env.LINKEDIN_ACCESS_TOKEN || "";
const linkedInAuthorUrn = process.env.LINKEDIN_AUTHOR_URN || "";
const linkedInCron = process.env.LINKEDIN_SYNC_CRON || "0 */6 * * *";

let client;

async function getDb() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set.");
  }
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
  }
  return client.db(dbName);
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!adminToken || token !== adminToken) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }
  next();
}

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch (error) {
    return null;
  }
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateReadingTime(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.ceil(words.length / 200));
  return minutes;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/profile", async (_req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection(profileCollection).findOne({ _id: profileId });
    if (!doc) {
      res.status(404).json({ error: "Profile data not found." });
      return;
    }
    res.json(doc);
  } catch (error) {
    console.error("Profile load failed:", error.message);
    res.status(500).json({ error: "Failed to load profile data." });
  }
});

app.get("/api/projects", async (_req, res) => {
  try {
    const db = await getDb();
    const docs = await db.collection(projectsCollection).find({}).sort({ createdAt: -1 }).toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load projects." });
  }
});

app.get("/api/experience", async (_req, res) => {
  try {
    const db = await getDb();
    const docs = await db.collection(experienceCollection).find({}).sort({ order: 1 }).toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load experience." });
  }
});

app.get("/api/blogs", async (_req, res) => {
  try {
    const db = await getDb();
    const docs = await db
      .collection(blogsCollection)
      .find({ status: "published" })
      .sort({ publishedAt: -1 })
      .toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load blogs." });
  }
});

app.get("/api/blogs/:slug", async (req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection(blogsCollection).findOne({ slug: req.params.slug, status: "published" });
    if (!doc) {
      res.status(404).json({ error: "Blog not found." });
      return;
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Failed to load blog." });
  }
});

app.get("/api/admin/profile", requireAdmin, async (_req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection(profileCollection).findOne({ _id: profileId });
    res.json(doc || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to load profile data." });
  }
});

app.put("/api/admin/profile", requireAdmin, async (req, res) => {
  try {
    const payload = { ...req.body, _id: profileId };
    const db = await getDb();
    await db.collection(profileCollection).replaceOne({ _id: profileId }, payload, { upsert: true });
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: "Failed to save profile data." });
  }
});

app.get("/api/admin/projects", requireAdmin, async (_req, res) => {
  try {
    const db = await getDb();
    const docs = await db.collection(projectsCollection).find({}).sort({ createdAt: -1 }).toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load projects." });
  }
});

app.post("/api/admin/projects", requireAdmin, async (req, res) => {
  try {
    const now = new Date().toISOString();
    const payload = {
      ...req.body,
      createdAt: req.body.createdAt || now,
      updatedAt: now,
    };
    const db = await getDb();
    const result = await db.collection(projectsCollection).insertOne(payload);
    res.status(201).json({ ...payload, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create project." });
  }
});

app.put("/api/admin/projects/bulk", requireAdmin, async (req, res) => {
  try {
    const raw = req.body;
    const items = Array.isArray(raw) ? raw : Array.isArray(raw.items) ? raw.items : [];
    const now = new Date().toISOString();
    const payload = items.map((item) => {
      const { _id, ...rest } = item || {};
      return {
        ...rest,
        createdAt: rest.createdAt || now,
        updatedAt: now,
      };
    });
    const db = await getDb();
    const collection = db.collection(projectsCollection);
    await collection.deleteMany({});
    if (payload.length) {
      await collection.insertMany(payload);
    }
    res.json({ ok: true, count: payload.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to bulk update projects." });
  }
});

app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  const objectId = toObjectId(req.params.id);
  if (!objectId) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  try {
    const now = new Date().toISOString();
    const payload = { ...req.body, updatedAt: now };
    const db = await getDb();
    const result = await db.collection(projectsCollection).findOneAndUpdate(
      { _id: objectId },
      { $set: payload },
      { returnDocument: "after" }
    );
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project." });
  }
});

app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  const objectId = toObjectId(req.params.id);
  if (!objectId) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  try {
    const db = await getDb();
    await db.collection(projectsCollection).deleteOne({ _id: objectId });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project." });
  }
});

app.get("/api/admin/experience", requireAdmin, async (_req, res) => {
  try {
    const db = await getDb();
    const docs = await db.collection(experienceCollection).find({}).sort({ order: 1 }).toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load experience." });
  }
});

app.post("/api/admin/experience", requireAdmin, async (req, res) => {
  try {
    const now = new Date().toISOString();
    const payload = {
      ...req.body,
      createdAt: req.body.createdAt || now,
      updatedAt: now,
    };
    const db = await getDb();
    const result = await db.collection(experienceCollection).insertOne(payload);
    res.status(201).json({ ...payload, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create experience." });
  }
});

app.put("/api/admin/experience/bulk", requireAdmin, async (req, res) => {
  try {
    const raw = req.body;
    const items = Array.isArray(raw) ? raw : Array.isArray(raw.items) ? raw.items : [];
    const now = new Date().toISOString();
    const payload = items.map((item) => {
      const { _id, ...rest } = item || {};
      return {
        ...rest,
        createdAt: rest.createdAt || now,
        updatedAt: now,
      };
    });
    const db = await getDb();
    const collection = db.collection(experienceCollection);
    await collection.deleteMany({});
    if (payload.length) {
      await collection.insertMany(payload);
    }
    res.json({ ok: true, count: payload.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to bulk update experience." });
  }
});

app.put("/api/admin/experience/:id", requireAdmin, async (req, res) => {
  const objectId = toObjectId(req.params.id);
  if (!objectId) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  try {
    const now = new Date().toISOString();
    const payload = { ...req.body, updatedAt: now };
    const db = await getDb();
    const result = await db.collection(experienceCollection).findOneAndUpdate(
      { _id: objectId },
      { $set: payload },
      { returnDocument: "after" }
    );
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Failed to update experience." });
  }
});

app.delete("/api/admin/experience/:id", requireAdmin, async (req, res) => {
  const objectId = toObjectId(req.params.id);
  if (!objectId) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  try {
    const db = await getDb();
    await db.collection(experienceCollection).deleteOne({ _id: objectId });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete experience." });
  }
});

app.get("/api/admin/blogs", requireAdmin, async (_req, res) => {
  try {
    const db = await getDb();
    const docs = await db.collection(blogsCollection).find({}).sort({ publishedAt: -1 }).toArray();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to load blogs." });
  }
});

app.post("/api/admin/blogs", requireAdmin, async (req, res) => {
  try {
    const now = new Date().toISOString();
    const title = req.body.title || "Untitled";
    const summary = req.body.summary || "";
    const contentText = req.body.contentText || "";
    const payload = {
      ...req.body,
      title,
      slug: req.body.slug || slugify(title),
      summary,
      contentText,
      readingTimeMinutes: req.body.readingTimeMinutes || estimateReadingTime(contentText || summary),
      status: req.body.status || "draft",
      publishedAt: req.body.publishedAt || now,
      updatedAt: now,
      createdAt: req.body.createdAt || now,
      source: req.body.source || "manual",
    };
    const db = await getDb();
    const result = await db.collection(blogsCollection).insertOne(payload);
    res.status(201).json({ ...payload, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog." });
  }
});

app.put("/api/admin/blogs/bulk", requireAdmin, async (req, res) => {
  try {
    const raw = req.body;
    const items = Array.isArray(raw) ? raw : Array.isArray(raw.items) ? raw.items : [];
    const now = new Date().toISOString();
    const payload = items.map((item) => {
      const { _id, ...rest } = item || {};
      const title = rest.title || "Untitled";
      const summary = rest.summary || "";
      const contentText = rest.contentText || "";
      return {
        ...rest,
        title,
        slug: rest.slug || slugify(title),
        summary,
        contentText,
        readingTimeMinutes: rest.readingTimeMinutes || estimateReadingTime(contentText || summary),
        status: rest.status || "draft",
        publishedAt: rest.publishedAt || now,
        updatedAt: now,
        createdAt: rest.createdAt || now,
        source: rest.source || "manual",
      };
    });
    const db = await getDb();
    const collection = db.collection(blogsCollection);
    await collection.deleteMany({});
    if (payload.length) {
      await collection.insertMany(payload);
    }
    res.json({ ok: true, count: payload.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to bulk update blogs." });
  }
});

app.put("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  const objectId = toObjectId(req.params.id);
  if (!objectId) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  try {
    const now = new Date().toISOString();
    const payload = { ...req.body, updatedAt: now };
    const db = await getDb();
    const result = await db.collection(blogsCollection).findOneAndUpdate(
      { _id: objectId },
      { $set: payload },
      { returnDocument: "after" }
    );
    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog." });
  }
});

app.delete("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  const objectId = toObjectId(req.params.id);
  if (!objectId) {
    res.status(400).json({ error: "Invalid id." });
    return;
  }
  try {
    const db = await getDb();
    await db.collection(blogsCollection).deleteOne({ _id: objectId });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog." });
  }
});

async function syncLinkedInPosts() {
  if (!linkedInToken || !linkedInAuthorUrn) {
    return { ok: false, error: "LinkedIn credentials not configured." };
  }

  const apiUrl = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent(linkedInAuthorUrn)})&sortBy=LAST_MODIFIED`;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${linkedInToken}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });

  if (!response.ok) {
    return { ok: false, error: "LinkedIn API request failed." };
  }

  const payload = await response.json();
  const posts = payload.elements || [];
  const db = await getDb();
  const collection = db.collection(blogsCollection);

  let upserted = 0;

  for (const post of posts) {
    const text = post?.specificContent?.["com.linkedin.ugc.ShareContent"]?.shareCommentary?.text || "";
    const title = text.split("\n").find(Boolean) || "LinkedIn update";
    const slug = slugify(title);
    const publishedAt = post?.firstPublishedAt
      ? new Date(post.firstPublishedAt).toISOString()
      : new Date().toISOString();
    const blogDoc = {
      title,
      slug,
      summary: text.slice(0, 200),
      contentText: text,
      contentHtml: "",
      coverImage: "",
      publishedAt,
      updatedAt: new Date().toISOString(),
      tags: [],
      canonicalUrl: "",
      source: "linkedin",
      sourceUrl: "",
      status: "published",
      readingTimeMinutes: estimateReadingTime(text),
    };

    const result = await collection.updateOne(
      { source: "linkedin", slug },
      { $set: blogDoc },
      { upsert: true }
    );
    if (result.upsertedCount || result.modifiedCount) {
      upserted += 1;
    }
  }

  return { ok: true, upserted };
}

app.post("/api/admin/linkedin/sync", requireAdmin, async (_req, res) => {
  try {
    const result = await syncLinkedInPosts();
    if (!result.ok) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ ok: false, error: "LinkedIn sync failed." });
  }
});

if (linkedInToken && linkedInAuthorUrn) {
  cron.schedule(linkedInCron, () => {
    syncLinkedInPosts().catch(() => {});
  });
}

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
