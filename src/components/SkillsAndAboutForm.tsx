import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, User, X } from "lucide-react";
import { useState } from "react";

interface SkillsAndAboutFormProps {
  skills: string[];
  aboutMe: string;
  onSkillsChange: (skills: string[]) => void;
  onAboutMeChange: (aboutMe: string) => void;
  language: "en" | "de" | "ar";
}

const labels = {
  en: {
    skillsTitle: "Skills",
    skillsSubtitle: "What you're particularly good at and sets you apart. Choose at least 2 skills.",
    skillPlaceholder: "e.g., Python, Marketing, Leadership",
    addSkill: "Add",
    aboutTitle: "About Me",
    aboutSubtitle: "Tell recruiters something about yourself",
    aboutPlaceholder: "What makes you unique?",
    charCount: "characters",
  },
  de: {
    skillsTitle: "Fähigkeiten",
    skillsSubtitle: "Erzähl hier, was Du besonders gut kannst und Dich ausmacht. Wähle mindestens 2 Fähigkeiten.",
    skillPlaceholder: "z.B. Python, Marketing, Führung",
    addSkill: "Hinzufügen",
    aboutTitle: "Über mich",
    aboutSubtitle: "Erzähl den Recruiter:innen etwas über Dich",
    aboutPlaceholder: "Was macht Dich aus?",
    charCount: "Zeichen",
  },
  ar: {
    skillsTitle: "المهارات",
    skillsSubtitle: "ما الذي تجيده بشكل خاص ويميزك. اختر مهارتين على الأقل.",
    skillPlaceholder: "مثل: Python، التسويق، القيادة",
    addSkill: "إضافة",
    aboutTitle: "عني",
    aboutSubtitle: "أخبر المسؤولين عن التوظيف شيئاً عن نفسك",
    aboutPlaceholder: "ما الذي يميزك؟",
    charCount: "حرف",
  },
};

export default function SkillsAndAboutForm({
  skills,
  aboutMe,
  onSkillsChange,
  onAboutMeChange,
  language,
}: SkillsAndAboutFormProps) {
  const t = labels[language];
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      onSkillsChange([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            {t.skillsTitle}
          </h3>
          <p className="text-sm text-slate-600">{t.skillsSubtitle}</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder={t.skillPlaceholder}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type="button" onClick={addSkill} variant="outline">
            {t.addSkill}
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* About Me Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            {t.aboutTitle}
          </h3>
          <p className="text-sm text-slate-600">{t.aboutSubtitle}</p>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder={t.aboutPlaceholder}
            value={aboutMe}
            onChange={(e) => onAboutMeChange(e.target.value)}
            rows={5}
            maxLength={1000}
          />
          <div className="text-xs text-slate-500 text-right">
            {aboutMe.length}/1000 {t.charCount}
          </div>
        </div>
      </div>
    </div>
  );
}
