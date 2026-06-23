export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  profileImage: string;
  resumeUrl: string;
  resumeLabel: string;
}

export interface AboutData {
  heading: string;
  bio: string;
  paragraphs: string[];
  profileImage: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: SkillItem[];
}

export interface SkillsData {
  heading: string;
  categories: SkillCategory[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  image: string;
  liveUrl: string;
  repoUrl: string;
  tags: string[];
  featured: boolean;
  order: number;
}

export interface ProjectsData {
  heading: string;
  items: ProjectItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  tags: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface ExperienceData {
  heading: string;
  items: ExperienceItem[];
  education: EducationItem[];
}

export interface SocialItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface SocialsData {
  items: SocialItem[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SettingsData {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  navLinks: NavLink[];
  footerText: string;
  defaultTheme: "light" | "dark";
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
