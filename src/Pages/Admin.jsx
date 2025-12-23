import { useEffect, useState } from "react";
import {
  adminBulkBlogs,
  adminBulkExperience,
  adminBulkProjects,
  adminFetchBlogs,
  adminFetchExperience,
  adminFetchProfile,
  adminFetchProjects,
  adminSaveProfile,
  adminSyncLinkedIn,
} from "../services/api.js";

function formatJson(value) {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch (error) {
    return "";
  }
}

function parseJson(value) {
  return JSON.parse(value);
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [status, setStatus] = useState("");
  const [profileJson, setProfileJson] = useState("");
  const [projectsJson, setProjectsJson] = useState("");
  const [experienceJson, setExperienceJson] = useState("");
  const [blogsJson, setBlogsJson] = useState("");

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  const loadAll = async () => {
    setStatus("Loading...");
    try {
      const [profile, projects, experience, blogs] = await Promise.all([
        adminFetchProfile(token),
        adminFetchProjects(token),
        adminFetchExperience(token),
        adminFetchBlogs(token),
      ]);
      setProfileJson(formatJson(profile));
      setProjectsJson(formatJson(projects));
      setExperienceJson(formatJson(experience));
      setBlogsJson(formatJson(blogs));
      setStatus("Loaded.");
    } catch (error) {
      setStatus(error.message || "Failed to load.");
    }
  };

  const saveProfile = async () => {
    setStatus("Saving profile...");
    try {
      const payload = parseJson(profileJson);
      await adminSaveProfile(token, payload);
      setStatus("Profile saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save profile.");
    }
  };

  const saveProjects = async () => {
    setStatus("Saving projects...");
    try {
      const payload = parseJson(projectsJson);
      await adminBulkProjects(token, payload);
      setStatus("Projects saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save projects.");
    }
  };

  const saveExperience = async () => {
    setStatus("Saving experience...");
    try {
      const payload = parseJson(experienceJson);
      await adminBulkExperience(token, payload);
      setStatus("Experience saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save experience.");
    }
  };

  const saveBlogs = async () => {
    setStatus("Saving blogs...");
    try {
      const payload = parseJson(blogsJson);
      await adminBulkBlogs(token, payload);
      setStatus("Blogs saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save blogs.");
    }
  };

  const syncLinkedIn = async () => {
    setStatus("Syncing LinkedIn...");
    try {
      const result = await adminSyncLinkedIn(token);
      setStatus(`LinkedIn sync completed. Upserted ${result.upserted || 0}.`);
    } catch (error) {
      setStatus(error.message || "LinkedIn sync failed.");
    }
  };

  return (
    <section className="container mx-auto pt-16 pb-12">
      <div className="section-shell space-y-10">
        <div className="space-y-4">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Admin
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-theme-tc">Portfolio Dashboard</h1>
          <p className="text-theme-lc max-w-2xl">
            Paste JSON for each collection and save. This replaces the collection content.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm text-theme-lc">Admin Token</label>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="input input-bordered w-full md:max-w-lg bg-base-100/50 text-theme-tc"
              placeholder="Bearer token"
            />
            <button className="btn rounded-full bg-theme-p text-theme-b" onClick={loadAll}>
              Load data
            </button>
            <button className="btn rounded-full border border-white/10" onClick={syncLinkedIn}>
              Sync LinkedIn
            </button>
          </div>
          {status && <p className="text-sm text-theme-lc">{status}</p>}
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-theme-tc">Profile (single document)</h2>
            <textarea
              value={profileJson}
              onChange={(event) => setProfileJson(event.target.value)}
              className="textarea textarea-bordered w-full min-h-[220px] bg-base-100/50 text-theme-tc"
            />
            <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveProfile}>
              Save profile
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-theme-tc">Projects (array)</h2>
            <textarea
              value={projectsJson}
              onChange={(event) => setProjectsJson(event.target.value)}
              className="textarea textarea-bordered w-full min-h-[220px] bg-base-100/50 text-theme-tc"
            />
            <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveProjects}>
              Save projects
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-theme-tc">Experience (array)</h2>
            <textarea
              value={experienceJson}
              onChange={(event) => setExperienceJson(event.target.value)}
              className="textarea textarea-bordered w-full min-h-[220px] bg-base-100/50 text-theme-tc"
            />
            <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveExperience}>
              Save experience
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-theme-tc">Blogs (array)</h2>
            <textarea
              value={blogsJson}
              onChange={(event) => setBlogsJson(event.target.value)}
              className="textarea textarea-bordered w-full min-h-[220px] bg-base-100/50 text-theme-tc"
            />
            <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveBlogs}>
              Save blogs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
