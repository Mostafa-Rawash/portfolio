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

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [status, setStatus] = useState("");
  const [profileDraft, setProfileDraft] = useState({
    profile: {},
    portfolioSite: { hero: {}, techSkills: {} },
  });
  const [projectsRows, setProjectsRows] = useState([]);
  const [experienceRows, setExperienceRows] = useState([]);
  const [blogsRows, setBlogsRows] = useState([]);

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  useEffect(() => {
    if (token) {
      loadAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setProfileDraft(profile || { profile: {}, portfolioSite: { hero: {}, techSkills: {} } });
      setProjectsRows(Array.isArray(projects) ? projects : []);
      setExperienceRows(Array.isArray(experience) ? experience : []);
      const blogArray = Array.isArray(blogs) ? blogs : [];
      setBlogsRows(blogArray);
      setStatus("Loaded.");
    } catch (error) {
      setStatus(error.message || "Failed to load.");
    }
  };

  const saveProfile = async () => {
    setStatus("Saving profile...");
    try {
      await adminSaveProfile(token, profileDraft);
      setStatus("Profile saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save profile.");
    }
  };

  const saveProjects = async () => {
    setStatus("Saving projects...");
    try {
      await adminBulkProjects(token, projectsRows);
      setStatus("Projects saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save projects.");
    }
  };

  const saveExperience = async () => {
    setStatus("Saving experience...");
    try {
      await adminBulkExperience(token, experienceRows);
      setStatus("Experience saved.");
    } catch (error) {
      setStatus(error.message || "Failed to save experience.");
    }
  };

  const saveBlogs = async () => {
    setStatus("Saving blogs...");
    try {
      const payload = blogsRows;
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

  const updateBlogRow = (index, field, value) => {
    setBlogsRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addBlogRow = () => {
    setBlogsRows((prev) => [
      ...prev,
      {
        title: "",
        slug: "",
        summary: "",
        contentText: "",
        coverImage: "",
        publishedAt: "",
        tags: [],
        status: "draft",
        source: "manual",
        sourceUrl: "",
      },
    ]);
  };

  const removeBlogRow = (index) => {
    setBlogsRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateBlogTags = (index, value) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    updateBlogRow(index, "tags", tags);
  };

  const updateProfileField = (path, value) => {
    setProfileDraft((prev) => {
      const next = { ...prev };
      let cursor = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        const key = path[i];
        cursor[key] = { ...(cursor[key] || {}) };
        cursor = cursor[key];
      }
      cursor[path[path.length - 1]] = value;
      return next;
    });
  };

  const updateTechSkills = (key, value) => {
    const list = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    updateProfileField(["portfolioSite", "techSkills", key], list);
  };

  const updateProjectsRow = (index, field, value) => {
    setProjectsRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addProjectRow = () => {
    setProjectsRows((prev) => [
      ...prev,
      {
        name: "",
        period: "",
        description: "",
        gitUrl: "",
        img: "",
        badges: [],
      },
    ]);
  };

  const removeProjectRow = (index) => {
    setProjectsRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateProjectBadges = (index, value) => {
    const badges = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    updateProjectsRow(index, "badges", badges);
  };

  const updateExperienceRow = (index, field, value) => {
    setExperienceRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addExperienceRow = () => {
    setExperienceRows((prev) => [
      ...prev,
      {
        company: "",
        title: "",
        period: "",
        achievements: [],
      },
    ]);
  };

  const removeExperienceRow = (index) => {
    setExperienceRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateExperienceAchievements = (index, value) => {
    const achievements = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    updateExperienceRow(index, "achievements", achievements);
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
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-theme-tc">Profile</h2>
              <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveProfile}>
                Save profile
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Name"
                value={profileDraft.profile?.name || ""}
                onChange={(event) => updateProfileField(["profile", "name"], event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Headline"
                value={profileDraft.profile?.headline || ""}
                onChange={(event) => updateProfileField(["profile", "headline"], event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Location"
                value={profileDraft.profile?.location || ""}
                onChange={(event) => updateProfileField(["profile", "location"], event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Followers"
                value={profileDraft.profile?.followers || ""}
                onChange={(event) => updateProfileField(["profile", "followers"], event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Connections"
                value={profileDraft.profile?.connections || ""}
                onChange={(event) => updateProfileField(["profile", "connections"], event.target.value)}
              />
              <textarea
                className="textarea textarea-bordered bg-base-100/50 text-theme-tc md:col-span-2"
                placeholder="About"
                value={profileDraft.profile?.about || ""}
                onChange={(event) => updateProfileField(["profile", "about"], event.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Hero title"
                value={profileDraft.portfolioSite?.hero?.title || ""}
                onChange={(event) => updateProfileField(["portfolioSite", "hero", "title"], event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Hero name"
                value={profileDraft.portfolioSite?.hero?.name || ""}
                onChange={(event) => updateProfileField(["portfolioSite", "hero", "name"], event.target.value)}
              />
              <textarea
                className="textarea textarea-bordered bg-base-100/50 text-theme-tc md:col-span-2"
                placeholder="Hero summary"
                value={profileDraft.portfolioSite?.hero?.summary || ""}
                onChange={(event) => updateProfileField(["portfolioSite", "hero", "summary"], event.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Programming languages (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.programmingLanguages || []).join(", ")}
                onChange={(event) => updateTechSkills("programmingLanguages", event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Frameworks/stacks (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.frameworksStacks || []).join(", ")}
                onChange={(event) => updateTechSkills("frameworksStacks", event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Front end (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.frontEnd || []).join(", ")}
                onChange={(event) => updateTechSkills("frontEnd", event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Back end (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.backEnd || []).join(", ")}
                onChange={(event) => updateTechSkills("backEnd", event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Databases (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.databases || []).join(", ")}
                onChange={(event) => updateTechSkills("databases", event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="Design (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.design || []).join(", ")}
                onChange={(event) => updateTechSkills("design", event.target.value)}
              />
              <input
                className="input input-bordered bg-base-100/50 text-theme-tc"
                placeholder="DevOps (comma separated)"
                value={(profileDraft.portfolioSite?.techSkills?.devOps || []).join(", ")}
                onChange={(event) => updateTechSkills("devOps", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-theme-tc">Projects</h2>
              <div className="flex flex-wrap gap-3">
                <button className="btn rounded-full border border-white/10" onClick={addProjectRow}>
                  Add project
                </button>
                <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveProjects}>
                  Save projects
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full bg-base-100/40 text-theme-tc">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Period</th>
                    <th>Git URL</th>
                    <th>Image</th>
                    <th>Badges</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projectsRows.map((project, index) => (
                    <tr key={project._id || index}>
                      <td>
                        <input
                          className="input input-bordered input-sm w-56 bg-base-100/70"
                          value={project.name || ""}
                          onChange={(event) => updateProjectsRow(index, "name", event.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered input-sm w-40 bg-base-100/70"
                          value={project.period || ""}
                          onChange={(event) => updateProjectsRow(index, "period", event.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered input-sm w-56 bg-base-100/70"
                          value={project.gitUrl || ""}
                          onChange={(event) => updateProjectsRow(index, "gitUrl", event.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered input-sm w-56 bg-base-100/70"
                          value={project.img || ""}
                          onChange={(event) => updateProjectsRow(index, "img", event.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered input-sm w-48 bg-base-100/70"
                          value={(project.badges || []).join(", ")}
                          onChange={(event) => updateProjectBadges(index, event.target.value)}
                        />
                      </td>
                      <td>
                        <textarea
                          className="textarea textarea-bordered textarea-sm w-72 bg-base-100/70"
                          value={project.description || project.des?.[0]?.main || ""}
                          onChange={(event) => updateProjectsRow(index, "description", event.target.value)}
                        />
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs text-red-200" onClick={() => removeProjectRow(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!projectsRows.length && (
                    <tr>
                      <td colSpan={7} className="text-center text-theme-lc py-6">
                        No projects yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-theme-tc">Experience</h2>
              <div className="flex flex-wrap gap-3">
                <button className="btn rounded-full border border-white/10" onClick={addExperienceRow}>
                  Add experience
                </button>
                <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveExperience}>
                  Save experience
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full bg-base-100/40 text-theme-tc">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Period</th>
                    <th>Highlights (one per line)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {experienceRows.map((exp, index) => (
                    <tr key={exp._id || index}>
                      <td>
                        <input
                          className="input input-bordered input-sm w-48 bg-base-100/70"
                          value={exp.company || ""}
                          onChange={(event) => updateExperienceRow(index, "company", event.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered input-sm w-56 bg-base-100/70"
                          value={exp.title || ""}
                          onChange={(event) => updateExperienceRow(index, "title", event.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="input input-bordered input-sm w-40 bg-base-100/70"
                          value={exp.period || ""}
                          onChange={(event) => updateExperienceRow(index, "period", event.target.value)}
                        />
                      </td>
                      <td>
                        <textarea
                          className="textarea textarea-bordered textarea-sm w-80 bg-base-100/70"
                          value={(exp.achievements || []).join("\n")}
                          onChange={(event) => updateExperienceAchievements(index, event.target.value)}
                        />
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs text-red-200" onClick={() => removeExperienceRow(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!experienceRows.length && (
                    <tr>
                      <td colSpan={5} className="text-center text-theme-lc py-6">
                        No experience yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-theme-tc">Blogs</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn rounded-full border border-white/10" onClick={addBlogRow}>
                Add blog
              </button>
              <button className="btn rounded-full bg-theme-p text-theme-b" onClick={saveBlogs}>
                Save blogs
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full bg-base-100/40 text-theme-tc">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Tags</th>
                  <th>Source</th>
                  <th>Source URL</th>
                  <th>Cover</th>
                  <th>Summary</th>
                  <th>Content</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {blogsRows.map((blog, index) => (
                  <tr key={blog._id || index}>
                    <td>
                      <input
                        className="input input-bordered input-sm w-56 bg-base-100/70"
                        value={blog.title || ""}
                        onChange={(event) => updateBlogRow(index, "title", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input input-bordered input-sm w-48 bg-base-100/70"
                        value={blog.slug || ""}
                        onChange={(event) => updateBlogRow(index, "slug", event.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="select select-bordered select-sm bg-base-100/70"
                        value={blog.status || "draft"}
                        onChange={(event) => updateBlogRow(index, "status", event.target.value)}
                      >
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className="input input-bordered input-sm w-44 bg-base-100/70"
                        value={blog.publishedAt || ""}
                        onChange={(event) => updateBlogRow(index, "publishedAt", event.target.value)}
                        placeholder="2025-01-01"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-bordered input-sm w-48 bg-base-100/70"
                        value={(blog.tags || []).join(", ")}
                        onChange={(event) => updateBlogTags(index, event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input input-bordered input-sm w-36 bg-base-100/70"
                        value={blog.source || ""}
                        onChange={(event) => updateBlogRow(index, "source", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input input-bordered input-sm w-64 bg-base-100/70"
                        value={blog.sourceUrl || ""}
                        onChange={(event) => updateBlogRow(index, "sourceUrl", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input input-bordered input-sm w-64 bg-base-100/70"
                        value={blog.coverImage || ""}
                        onChange={(event) => updateBlogRow(index, "coverImage", event.target.value)}
                      />
                    </td>
                    <td>
                      <textarea
                        className="textarea textarea-bordered textarea-sm w-72 bg-base-100/70"
                        value={blog.summary || ""}
                        onChange={(event) => updateBlogRow(index, "summary", event.target.value)}
                      />
                    </td>
                    <td>
                      <textarea
                        className="textarea textarea-bordered textarea-sm w-80 bg-base-100/70"
                        value={blog.contentText || ""}
                        onChange={(event) => updateBlogRow(index, "contentText", event.target.value)}
                      />
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs text-red-200" onClick={() => removeBlogRow(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {!blogsRows.length && (
                  <tr>
                    <td colSpan={11} className="text-center text-theme-lc py-6">
                      No blogs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
