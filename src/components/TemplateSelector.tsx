import { CVTemplate, cvTemplates } from "@/lib/cvTemplates";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">
        CV Template
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cvTemplates.map((template: CVTemplate) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md relative ${
              selectedTemplate === template.id
                ? "ring-2 ring-offset-2"
                : "hover:ring-1 hover:ring-slate-300"
            }`}
            style={{
              ...(selectedTemplate === template.id && {
                borderColor: template.colors.primary,
              }),
            }}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="p-3 space-y-2">
              {/* Color Preview */}
              <div className="flex gap-1 h-8">
                <div
                  className="flex-1 rounded"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <div
                  className="flex-1 rounded"
                  style={{ backgroundColor: template.colors.accent }}
                />
                <div
                  className="flex-1 rounded"
                  style={{ backgroundColor: template.colors.primaryLight }}
                />
              </div>
              
              {/* Template Name */}
              <div className="text-sm font-medium text-slate-900">
                {template.name}
              </div>
              
              {/* Selected Indicator */}
              {selectedTemplate === template.id && (
                <div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: template.colors.primary }}
                >
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
