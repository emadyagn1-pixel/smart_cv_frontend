// Language names mapping
const languageNames: Record<string, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  it: "Italian",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  ar: "Arabic",
  zh: "Chinese",
  ja: "Japanese"
};

interface CVData {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  skills: string[];
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    rewritten_description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  projects?: Array<{
    title: string;
    description: string;
    technologies?: string;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  hobbies: string[];
}

/**
 * Translate CV content to target language using Backend API
 */
export async function translateCV(
  cv: CVData,
  targetLanguage: string
): Promise<CVData> {
  // If target is English, return original
  if (targetLanguage === "en") {
    return cv;
  }

  try {
    // Get API URL from environment
    const apiUrl = import.meta.env.VITE_API_URL || "https://smart-ats-c-v.onrender.com";
    
    // Call Backend API for translation
    const response = await fetch(`${apiUrl}/translate-cv/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cv_data: cv,
        target_language: targetLanguage
      } )
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Translation API error:", errorText);
      throw new Error(`Translation failed: ${response.status}`);
    }

    const translatedCV = await response.json();
    return translatedCV;

  } catch (error) {
    console.error("Translation error:", error);
    // Return original CV if translation fails
    return cv;
  }
}

/**
 * Translate section titles
 */
export const sectionTitles: Record<string, Record<string, string>> = {
  professionalSummary: {
    en: "Professional Summary",
    de: "Berufliche Zusammenfassung",
    fr: "Résumé Professionnel",
    es: "Resumen Profesional",
    it: "Riepilogo Professionale",
    nl: "Professionele Samenvatting",
    pl: "Podsumowanie Zawodowe",
    pt: "Resumo Profissional",
    ar: "الملخص المهني",
    zh: "专业总结",
    ja: "プロフェッショナルサマリー"
  },
  technicalSkills: {
    en: "Technical Skills",
    de: "Technische Fähigkeiten",
    fr: "Compétences Techniques",
    es: "Habilidades Técnicas",
    it: "Competenze Tecniche",
    nl: "Technische Vaardigheden",
    pl: "Umiejętności Techniczne",
    pt: "Habilidades Técnicas",
    ar: "المهارات التقنية",
    zh: "技术技能",
    ja: "技術スキル"
  },
  workExperience: {
    en: "Work Experience",
    de: "Berufserfahrung",
    fr: "Expérience Professionnelle",
    es: "Experiencia Laboral",
    it: "Esperienza Lavorativa",
    nl: "Werkervaring",
    pl: "Doświadczenie Zawodowe",
    pt: "Experiência Profissional",
    ar: "الخبرة العملية",
    zh: "工作经验",
    ja: "職務経歴"
  },
  education: {
    en: "Education",
    de: "Bildung",
    fr: "Formation",
    es: "Educación",
    it: "Istruzione",
    nl: "Opleiding",
    pl: "Wykształcenie",
    pt: "Educação",
    ar: "التعليم",
    zh: "教育背景",
    ja: "学歴"
  },
  projects: {
    en: "Projects",
    de: "Projekte",
    fr: "Projets",
    es: "Proyectos",
    it: "Progetti",
    nl: "Projecten",
    pl: "Projekty",
    pt: "Projetos",
    ar: "المشاريع",
    zh: "项目",
    ja: "プロジェクト"
  },
  languages: {
    en: "Languages",
    de: "Sprachen",
    fr: "Langues",
    es: "Idiomas",
    it: "Lingue",
    nl: "Talen",
    pl: "Języki",
    pt: "Idiomas",
    ar: "اللغات",
    zh: "语言",
    ja: "言語"
  },
  hobbies: {
    en: "Hobbies & Interests",
    de: "Hobbys & Interessen",
    fr: "Loisirs & Intérêts",
    es: "Pasatiempos e Intereses",
    it: "Hobby e Interessi",
    nl: "Hobby's & Interesses",
    pl: "Hobby i Zainteresowania",
    pt: "Hobbies e Interesses",
    ar: "الهوايات والاهتمامات",
    zh: "爱好与兴趣",
    ja: "趣味・関心"
  }
};

/**
 * Get translated section title
 */
export function getSectionTitle(key: string, language: string): string {
  return sectionTitles[key]?.[language] || sectionTitles[key]?.["en"] || "";
}
