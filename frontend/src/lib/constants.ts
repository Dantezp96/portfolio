export const SITE = {
  title: "Omar Daniel Zorro | Data Scientist & ML Engineer",
  description:
    "Omar Daniel Zorro - Data Scientist & ML Engineer specializing in image analysis, computer vision, and data science. Explore my projects and experience.",
  url: "https://frontend-mauve-seven-17.vercel.app",
  author: "Omar Daniel Zorro",
  role: "Data & AI Engineer",
};

export const API_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:8000";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
