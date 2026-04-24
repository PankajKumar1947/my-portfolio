/** ============================================================
 * Resume Data — Skills, Experience, Education
 * ============================================================
 * This file pulls data from ./config/resume.json.
 * Edit the JSON file to update your background.
 * ============================================================ 
 */

import resumeData from "../data/resume.json";

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string | string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

// Data exports from JSON
export const skillCategories = resumeData.skillCategories as SkillCategory[];
export const experiences = resumeData.experiences as Experience[];
export const educations = resumeData.educations as Education[];
