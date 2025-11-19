

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Heart, X, Plus, Edit2, Save, XCircle } from "lucide-react";
import { cvTemplates } from "@/lib/cvTemplates";

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
  projects: Array<{
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

interface EditableCVDisplayProps {
  cv: CVData;
  templateId?: string;
  outputLanguage?: string;
  onCVUpdate?: (updatedCV: CVData) => void;
}

// Translation object for section titles
const sectionTitles: Record<string, Record<string, string>> = {
  professionalSummary: {
    en: "Professional Summary",
    de: "Berufliche Zusammenfassung",
    fr: "Résumé Professionnel",
    es: "Resumen Profesional",
    it: "Riepilogo Professionale"
  },
  technicalSkills: {
    en: "Technical Skills",
    de: "Technische Fähigkeiten",
    fr: "Compétences Techniques",
    es: "Habilidades Técnicas",
    it: "Competenze Tecniche"
  },
  workExperience: {
    en: "Work Experience",
    de: "Berufserfahrung",
    fr: "Expérience Professionnelle",
    es: "Experiencia Laboral",
    it: "Esperienza Lavorativa"
  },
  education: {
    en: "Education",
    de: "Bildung",
    fr: "Formation",
    es: "Educación",
    it: "Istruzione"
  },
  projects: {
    en: "Projects",
    de: "Projekte",
    fr: "Projets",
    es: "Proyectos",
    it: "Progetti"
  },
  languages: {
    en: "Languages",
    de: "Sprachen",
    fr: "Langues",
    es: "Idiomas",
    it: "Lingue"
  },
  hobbies: {
    en: "Hobbies & Interests",
    de: "Hobbys & Interessen",
    fr: "Loisirs & Intérêts",
    es: "Pasatiempos e Intereses",
    it: "Hobby e Interessi"
  }
};

export default function EditableCVDisplay({ 
  cv: initialCV, 
  templateId = "blue", 
  outputLanguage = "en",
  onCVUpdate 
}: EditableCVDisplayProps) {
  const [cv, setCV] = useState<CVData>(initialCV);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  
  // Update cv when initialCV changes (e.g., after translation)
  useEffect(() => {
    setCV(initialCV);
  }, [initialCV]);
  
  const template = cvTemplates.find(t => t.id === templateId) || cvTemplates[0];
  const colors = template.colors;
  
  // Get translated title
  const getTitle = (key: string) => {
    return sectionTitles[key]?.[outputLanguage] || sectionTitles[key]?.["en"] || "";
  };

  // Update CV and notify parent
  const updateCV = (updatedCV: CVData) => {
    setCV(updatedCV);
    onCVUpdate?.(updatedCV);
  };

  // Delete skill
  const deleteSkill = (index: number) => {
    const updatedCV = {
      ...cv,
      skills: cv.skills.filter((_, i) => i !== index)
    };
    updateCV(updatedCV);
  };

  // Add skill
  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedCV = {
        ...cv,
        skills: [...cv.skills, newSkill.trim()]
      };
      updateCV(updatedCV);
      setNewSkill("");
    }
  };

  // Delete experience
  const deleteExperience = (index: number) => {
    const updatedCV = {
      ...cv,
      experience: cv.experience.filter((_, i) => i !== index)
    };
    updateCV(updatedCV);
  };

  // Delete education
  const deleteEducation = (index: number) => {
    const updatedCV = {
      ...cv,
      education: cv.education.filter((_, i) => i !== index)
    };
    updateCV(updatedCV);
  };

  // Delete language
  const deleteLanguage = (index: number) => {
    const updatedCV = {
      ...cv,
      languages: cv.languages.filter((_, i) => i !== index)
    };
    updateCV(updatedCV);
  };

  // Delete hobby
  const deleteHobby = (index: number) => {
    const updatedCV = {
      ...cv,
      hobbies: cv.hobbies.filter((_, i) => i !== index)
    };
    updateCV(updatedCV);
  };

  // Update summary
  const updateSummary = (newSummary: string) => {
    const updatedCV = {
      ...cv,
      summary: newSummary
    };
    updateCV(updatedCV);
    setEditMode(null);
  };

  return (
    <Card className="bg-white shadow-lg print:shadow-none">
      <CardHeader 
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
        }}
        className="text-white"
      >
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold">{cv.name}</CardTitle>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.primaryLight }}>
            {cv.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{cv.email}</span>
              </div>
            )}
            {cv.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{cv.phone}</span>
              </div>
            )}
            {cv.address && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{cv.address}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6 print:p-4 print:space-y-2">
        {/* Professional Summary */}
        {cv.summary && (
          <section className="relative group">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5" style={{ color: colors.primary }} />
                {getTitle('professionalSummary')}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity no-print"
                onClick={() => setEditMode(editMode === 'summary' ? null : 'summary')}
              >
                {editMode === 'summary' ? <XCircle className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              </Button>
            </div>
            {editMode === 'summary' ? (
              <div className="space-y-2">
                <Textarea
                  value={cv.summary}
                  onChange={(e) => setCV({ ...cv, summary: e.target.value })}
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => updateSummary(cv.summary)}>
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    setCV(initialCV);
                    setEditMode(null);
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed">{cv.summary}</p>
            )}
          </section>
        )}

        {/* Technical Skills */}
        {cv.skills && cv.skills.length > 0 && (
          <section className="relative group">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5" style={{ color: colors.primary }} />
                {getTitle('technicalSkills')}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, index) => (
                <div key={index} className="relative group/skill">
                  <Badge 
                    style={{ 
                      backgroundColor: colors.accent,
                      color: colors.primary 
                    }}
                    className="text-sm px-3 py-1 pr-8"
                  >
                    {skill}
                    <button
                      onClick={() => deleteSkill(index)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity no-print hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </div>
              ))}
              <div className="flex gap-2 items-center no-print">
                <Input
                  placeholder="Add skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="w-32 h-8 text-sm"
                />
                <Button size="sm" variant="outline" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Work Experience */}
        {cv.experience && cv.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: colors.primary }} />
              {getTitle('workExperience')}
            </h2>
            <div className="space-y-4">
              {cv.experience.map((exp, index) => (
                <div key={index} className="relative group/exp border-l-2 pl-4" style={{ borderColor: colors.primary }}>
                  <button
                    onClick={() => deleteExperience(index)}
                    className="absolute -right-2 -top-2 opacity-0 group-hover/exp:opacity-100 transition-opacity no-print bg-red-50 hover:bg-red-100 rounded-full p-1"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                    <span className="text-sm text-slate-600">{exp.duration}</span>
                  </div>
                  <p className="text-slate-700 font-medium mb-2">{exp.company}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{exp.rewritten_description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cv.education && cv.education.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" style={{ color: colors.primary }} />
              {getTitle('education')}
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu, index) => (
                <div key={index} className="relative group/edu">
                  <button
                    onClick={() => deleteEducation(index)}
                    className="absolute -right-2 -top-2 opacity-0 group-hover/edu:opacity-100 transition-opacity no-print bg-red-50 hover:bg-red-100 rounded-full p-1"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-slate-600">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {cv.languages && cv.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: colors.primary }} />
              {getTitle('languages')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cv.languages.map((lang, index) => (
                <div key={index} className="relative group/lang">
                  <Badge 
                    variant="outline"
                    className="text-sm px-3 py-1 pr-8"
                  >
                    {lang.language} - {lang.proficiency}
                    <button
                      onClick={() => deleteLanguage(index)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/lang:opacity-100 transition-opacity no-print hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {cv.hobbies && cv.hobbies.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: colors.primary }} />
              {getTitle('hobbies')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cv.hobbies.map((hobby, index) => (
                <div key={index} className="relative group/hobby">
                  <Badge 
                    variant="outline"
                    className="text-sm px-3 py-1 pr-8"
                  >
                    {hobby}
                    <button
                      onClick={() => deleteHobby(index)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/hobby:opacity-100 transition-opacity no-print hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}