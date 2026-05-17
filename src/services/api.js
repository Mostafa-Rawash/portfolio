import profile from "../data/profile.json";
import projects from "../data/data.json";
import experience from "../data/experience.json";

export function fetchProfile() {
  return profile;
}

export function fetchProjects() {
  return projects;
}

export function fetchExperience() {
  return experience;
}