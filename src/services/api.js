const API_BASE = "";

async function request(path, options = {}) {
  const mergedHeaders = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const { headers: _ignored, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: mergedHeaders,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Request failed.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function fetchProfile() {
  return request("/api/profile");
}

export function fetchProjects() {
  return request("/api/projects");
}

export function fetchExperience() {
  return request("/api/experience");
}

export function fetchBlogs() {
  return request("/api/blogs");
}

export function fetchBlogBySlug(slug) {
  return request(`/api/blogs/${slug}`);
}

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function adminFetchProfile(token) {
  return request("/api/admin/profile", { headers: authHeader(token) });
}

export function adminSaveProfile(token, data) {
  return request("/api/admin/profile", {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify(data),
  });
}

export function adminFetchProjects(token) {
  return request("/api/admin/projects", { headers: authHeader(token) });
}

export function adminBulkProjects(token, items) {
  return request("/api/admin/projects/bulk", {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify({ items }),
  });
}

export function adminFetchExperience(token) {
  return request("/api/admin/experience", { headers: authHeader(token) });
}

export function adminBulkExperience(token, items) {
  return request("/api/admin/experience/bulk", {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify({ items }),
  });
}

export function adminFetchBlogs(token) {
  return request("/api/admin/blogs", { headers: authHeader(token) });
}

export function adminBulkBlogs(token, items) {
  return request("/api/admin/blogs/bulk", {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify({ items }),
  });
}

export function adminSyncLinkedIn(token) {
  return request("/api/admin/linkedin/sync", {
    method: "POST",
    headers: authHeader(token),
  });
}
