import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Education } from "@/types/manualForm";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import DateInput from "./DateInput";

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
  language: "en" | "de" | "ar";
}

const labels = {
  en: {
    title: "Education",
    subtitle: "When and where you learned",
    fieldOfStudy: "Field of Study",
    university: "University/Institution",
    degree: "Degree",
    startDate: "Start Date",
    endDate: "End Date",
    currentlyStudying: "I'm still studying",
    addEducation: "Add Education",
    remove: "Remove",
  },
  de: {
    title: "Ausbildung",
    subtitle: "Was Du wann und wo gelernt hast",
    fieldOfStudy: "Fachrichtung",
    university: "Hochschule",
    degree: "Abschluss",
    startDate: "Start-Datum",
    endDate: "End-Datum",
    currentlyStudying: "Ich studiere noch",
    addEducation: "Ausbildung hinzufügen",
    remove: "Löschen",
  },
  ar: {
    title: "التعليم",
    subtitle: "متى وأين تعلمت",
    fieldOfStudy: "مجال الدراسة",
    university: "الجامعة/المؤسسة",
    degree: "الدرجة العلمية",
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    currentlyStudying: "ما زلت أدرس",
    addEducation: "إضافة تعليم",
    remove: "حذف",
  },
};

export default function EducationForm({ education, onChange, language }: EducationFormProps) {
  const t = labels[language];

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      fieldOfStudy: "",
      university: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrentlyStudying: false,
    };
    onChange([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          {t.title}
        </h3>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </div>

      {education.map((edu, index) => (
        <div key={edu.id} className="border border-slate-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">
              {t.title} {index + 1}
            </span>
            {education.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {t.remove}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.fieldOfStudy}</Label>
              <Input
                placeholder="e.g., Marketing-Strategien"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.university}</Label>
              <Input
                placeholder="e.g., Universität Musterstadt"
                value={edu.university}
                onChange={(e) => updateEducation(edu.id, "university", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{t.degree}</Label>
              <Input
                placeholder="e.g., Bachelor, Master, Diplom"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.startDate}</Label>
              <DateInput
                value={edu.startDate}
                onChange={(val) => updateEducation(edu.id, "startDate", val)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.endDate}</Label>
              <DateInput
                value={edu.endDate}
                onChange={(val) => updateEducation(edu.id, "endDate", val)}
                placeholder={edu.isCurrentlyStudying ? "Present" : "MM/YYYY"}
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Checkbox
                id={`studying-${edu.id}`}
                checked={edu.isCurrentlyStudying}
                onCheckedChange={(checked) =>
                  updateEducation(edu.id, "isCurrentlyStudying", checked)
                }
              />
              <label
                htmlFor={`studying-${edu.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t.currentlyStudying}
              </label>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        {t.addEducation}
      </Button>
    </div>
  );
}
