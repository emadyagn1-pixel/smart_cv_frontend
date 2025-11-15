import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Heart } from "lucide-react";
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

interface CVDisplayProps {
  cv: CVData;
  templateId?: string;
}

export default function CVDisplay({ cv, templateId = "blue" }: CVDisplayProps) {
  const template = cvTemplates.find(t => t.id === templateId) || cvTemplates[0];
  const colors = template.colors;

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
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: colors.primary }} />
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed">{cv.summary}</p>
          </section>
        )}

        {/* Skills */}
        {cv.skills && cv.skills.length > 0 && (
          <section className="overflow-hidden">
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Code className="w-5 h-5" style={{ color: colors.primary }} />
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2 max-h-fit">
              {cv.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-3 py-1"
                  style={{ 
                    backgroundColor: colors.background,
                    color: colors.primary,
                    borderColor: colors.border,
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {cv.experience && cv.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: colors.primary }} />
              Work Experience
            </h2>
            <div className="space-y-4">
              {cv.experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="border-l-2 pl-4"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900">{exp.position}</h3>
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div 
                      className="text-sm font-medium px-3 py-1 rounded"
                      style={{ 
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary
                      }}
                    >
                      {exp.duration}
                    </div>
                  </div>
                  <div className="text-slate-700 leading-relaxed">
                    {exp.rewritten_description.split('\n').map((line, i) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                        return (
                          <div key={i} className="flex gap-2 mb-1">
                            <span style={{ color: colors.primary }}>•</span>
                            <span>{trimmed.substring(1).trim()}</span>
                          </div>
                        );
                      }
                      return trimmed ? <p key={i} className="mb-2">{trimmed}</p> : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cv.education && cv.education.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" style={{ color: colors.primary }} />
              Education
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu, index) => (
                <div 
                  key={index} 
                  className="border-l-2 pl-4"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <span className="text-sm font-medium" style={{ color: colors.primary }}>
                      {edu.year}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {cv.projects && cv.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Code className="w-5 h-5" style={{ color: colors.primary }} />
              Projects
            </h2>
            <div className="space-y-3">
              {cv.projects.map((project, index) => (
                <div 
                  key={index} 
                  className="border-l-2 pl-4"
                  style={{ borderColor: colors.border }}
                >
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-700 mb-1">{project.description}</p>
                  {project.technologies && (
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {cv.languages && cv.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: colors.primary }} />
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {cv.languages.map((lang, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: colors.background }}
                >
                  <span className="font-medium text-slate-900">{lang.language}</span>
                  <span className="text-sm text-slate-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {cv.hobbies && cv.hobbies.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: colors.primary }} />
              Hobbies & Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {cv.hobbies.map((hobby, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-3 py-1"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.primary,
                  }}
                >
                  {hobby}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
