import { API_URL } from "./constants";
import type { Project, Skill, Experience, ContactForm } from "./types";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getProjects(featured = false): Promise<Project[]> {
  const query = featured ? "?featured=true" : "";
  return fetchAPI<Project[]>(`/api/v1/projects${query}`);
}

export async function getProject(slug: string): Promise<Project> {
  return fetchAPI<Project>(`/api/v1/projects/${slug}`);
}

export async function getSkills(): Promise<Skill[]> {
  return fetchAPI<Skill[]>(`/api/v1/skills`);
}

export async function getExperiences(): Promise<Experience[]> {
  return fetchAPI<Experience[]>(`/api/v1/experience`);
}

export async function submitContact(data: ContactForm): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/api/v1/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Error sending message" }));
    throw new Error(error.detail || "Error sending message");
  }
  return res.json();
}
