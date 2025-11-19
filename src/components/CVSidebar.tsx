
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, GraduationCap, Code, Globe, Target, Heart } from "lucide-react";

interface CVSidebarProps {
  cv: {
    name: string;
    email: string;
    phone: string;
    summary: string;
    skills: string[];
    experience: any[];
    education: any[];
    languages: any[];
    hobbies: string[];
  };
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

export default function CVSidebar({ cv, activeSection, onSectionClick }: CVSidebarProps) {
  // Calculate completion percentages
  const calculateCompletion = (field: any): number => {
    if (Array.isArray(field)) {
      return field.length > 0 ? 100 : 0;
    }
    if (typeof field === 'string') {
      return field.trim().length > 0 ? 100 : 0;
    }
    return 0;
  };

  const sections = [
    {
      id: "personalInfo",
      title: "Personal Info",
      icon: <User className="w-4 h-4" />,
      completion: cv.name && cv.email && cv.phone ? 100 : 50
    },
    {
      id: "summary",
      title: "Summary",
      icon: <Target className="w-4 h-4" />,
      completion: calculateCompletion(cv.summary)
    },
    {
      id: "experience",
      title: "Experience",
      icon: <Briefcase className="w-4 h-4" />,
      completion: calculateCompletion(cv.experience)
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="w-4 h-4" />,
      completion: calculateCompletion(cv.education)
    },
    {
      id: "skills",
      title: "Skills",
      icon: <Code className="w-4 h-4" />,
      completion: calculateCompletion(cv.skills)
    },
    {
      id: "languages",
      title: "Languages",
      icon: <Globe className="w-4 h-4" />,
      completion: calculateCompletion(cv.languages)
    },
    {
      id: "hobbies",
      title: "Hobbies",
      icon: <Heart className="w-4 h-4" />,
      completion: calculateCompletion(cv.hobbies)
    }
  ];

  const overallCompletion = Math.round(
    sections.reduce((sum, section) => sum + section.completion, 0) / sections.length
  );

  const getCompletionColor = (completion: number) => {
    if (completion === 0) return "bg-gray-100 text-gray-600";
    if (completion < 50) return "bg-orange-100 text-orange-700";
    if (completion < 100) return "bg-blue-100 text-blue-700";
    return "bg-emerald-100 text-emerald-700";
  };

  const getProgressBarColor = (completion: number) => {
    if (completion === 0) return "bg-gray-400";
    if (completion < 50) return "bg-orange-500";
    if (completion < 100) return "bg-blue-500";
    return "bg-emerald-500";
  };

  return (
    <div className="w-64 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4 no-print">
      {/* Overall Progress */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">CV Completion</p>
            <p className="text-xs text-gray-600 mt-1">
              {overallCompletion === 100 
                ? "Perfect! Your CV is complete" 
                : "Keep going to complete your CV"}
            </p>
          </div>
          <div className="ml-3">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - overallCompletion / 100)}`}
                  className="text-teal-500 transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-bold text-gray-900">{overallCompletion}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressBarColor(overallCompletion)} transition-all duration-500`}
            style={{ width: `${overallCompletion}%` }}
          />
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
          Sections
        </p>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick?.(section.id)}
            className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all ${
              activeSection === section.id
                ? "bg-white shadow-sm border border-gray-200"
                : "hover:bg-white hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="text-gray-600">{section.icon}</div>
              <span className="text-sm font-medium text-gray-900">
                {section.title}
              </span>
            </div>
            <Badge 
              className={`${getCompletionColor(section.completion)} text-xs font-semibold px-2 py-0.5 border-0`}
            >
              {section.completion}%
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}