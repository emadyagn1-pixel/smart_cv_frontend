import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkExperience } from "@/types/manualForm";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import DateInput from "./DateInput";

interface ExperienceFormProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
  language: "en" | "de" | "ar";
}

const labels = {
  en: {
    title: "Work Experience",
    subtitle: "Tell us where and what you've worked on",
    jobTitle: "Job Title",
    company: "Company",
    industry: "Industry/Field",
    responsibilities: "Responsibilities & Achievements",
    startDate: "Start Date",
    endDate: "End Date",
    currentJob: "I currently work here",
    addExperience: "Add Experience",
    remove: "Remove",
  },
  de: {
    title: "Erfahrung",
    subtitle: "Erzähl hier, wo und als was Du schon gearbeitet und Erfahrungen gesammelt hast",
    jobTitle: "Job-Titel",
    company: "Arbeitgeber",
    industry: "Branche",
    responsibilities: "Tätigkeitsfeld",
    startDate: "Start-Datum",
    endDate: "End-Datum",
    currentJob: "Ich bin noch Teil des Teams",
    addExperience: "Erfahrung hinzufügen",
    remove: "Löschen",
  },
  ar: {
    title: "الخبرة العملية",
    subtitle: "أخبرنا أين وماذا عملت",
    jobTitle: "المسمى الوظيفي",
    company: "الشركة",
    industry: "المجال/الصناعة",
    responsibilities: "المسؤوليات والإنجازات",
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    currentJob: "ما زلت أعمل هنا",
    addExperience: "إضافة خبرة",
    remove: "حذف",
  },
};

export default function ExperienceForm({ experiences, onChange, language }: ExperienceFormProps) {
  const t = labels[language];

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      industry: "",
      responsibilities: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
    };
    onChange([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          {t.title}
        </h3>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className="border border-slate-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">
              {t.title} {index + 1}
            </span>
            {experiences.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {t.remove}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.jobTitle}</Label>
              <Input
                placeholder="e.g., Marketing-Manager:in"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.company}</Label>
              <Input
                placeholder="e.g., Musterfirma AG"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{t.industry}</Label>
              <Input
                placeholder="e.g., E-Commerce-Marketing"
                value={exp.industry}
                onChange={(e) => updateExperience(exp.id, "industry", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{t.responsibilities}</Label>
              <Textarea
                placeholder={t.responsibilities}
                value={exp.responsibilities}
                onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.startDate}</Label>
              <DateInput
                value={exp.startDate}
                onChange={(val) => updateExperience(exp.id, "startDate", val)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.endDate}</Label>
              <DateInput
                value={exp.endDate}
                onChange={(val) => updateExperience(exp.id, "endDate", val)}
                placeholder={exp.isCurrentJob ? "Present" : "MM/YYYY"}
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.isCurrentJob}
                onCheckedChange={(checked) =>
                  updateExperience(exp.id, "isCurrentJob", checked)
                }
              />
              <label
                htmlFor={`current-${exp.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t.currentJob}
              </label>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        {t.addExperience}
      </Button>
    </div>
  );
}
