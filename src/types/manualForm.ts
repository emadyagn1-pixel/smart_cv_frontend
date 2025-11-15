export interface PersonalInfo {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  postalCode: string; // For job location matching
  city: string;
  country: string;
  phone: string;
  email: string;
  photo?: File | null;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  industry: string;
  responsibilities: string;
  startDate: string; // MM/YYYY
  endDate: string; // MM/YYYY or "Present"
  isCurrentJob: boolean;
}

export interface Education {
  id: string;
  fieldOfStudy: string;
  university: string;
  degree: string;
  startDate: string; // MM/YYYY
  endDate: string; // MM/YYYY
  isCurrentlyStudying: boolean;
}

export interface ManualCVForm {
  personalInfo: PersonalInfo;
  experiences: WorkExperience[];
  education: Education[];
  skills: string[];
  aboutMe: string;
  inputLanguage: "en" | "de" | "ar";
  outputLanguage: "en" | "de" | "ar";
}
