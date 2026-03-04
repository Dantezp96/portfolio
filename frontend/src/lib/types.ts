export interface Project {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  category: string;
  tech_stack: string[];
  thumbnail_url: string;
  cover_image_url: string | null;
  media_urls: string[];
  demo_url: string | null;
  repo_url: string | null;
  display_order: number;
  is_featured: boolean;
  metrics: Record<string, string> | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon_name: string | null;
  display_order: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  tech_used: string[];
  company_logo_url: string | null;
  display_order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
