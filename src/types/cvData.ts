export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface Assessment {
  ats_score_before: number;
  ats_score_after: number;
  improvement_suggestions: string[];
  translation_summary: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  languages: string[];
  assessment: Assessment;
}

export const initialCVData: CVData = {
  personalInfo: {
    name: "[Your Name]",
    title: "[Your Title]",
    email: "[your.email@example.com]",
    phone: "[+1234567890]",
    location: "[City, Country]",
    summary: "[A brief professional summary about you]",
  },
  experiences: [
    {
      title: "[Job Title]",
      company: "[Company Name]",
      location: "[City, Country]",
      startDate: "[Month, Year]",
      endDate: "Present",
      description: [
        "[Responsibility or achievement 1]",
        "[Responsibility or achievement 2]",
      ],
    },
  ],
  education: [
    {
      degree: "[Degree]",
      fieldOfStudy: "[Field of Study]",
      institution: "[University Name]",
      startDate: "[Month, Year]",
      endDate: "[Month, Year]",
    },
  ],
  skills: ["[Skill 1]", "[Skill 2]", "[Skill 3]"],
  projects: [
    {
      title: "[Project Title]",
      description: "[Brief description of your project]",
    },
  ],
  languages: ["[Language 1]", "[Language 2]"],
  assessment: {
    ats_score_before: 0,
    ats_score_after: 0,
    improvement_suggestions: [],
    translation_summary: "",
  },
};
