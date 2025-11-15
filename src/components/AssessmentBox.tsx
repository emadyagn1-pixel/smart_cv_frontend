import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Target,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";

interface ImprovementsSummary {
  ats_score_before: number;
  ats_score_after: number;
  improvements_made: string[];
  translation_applied: boolean;
  input_language: string;
  output_language: string;
}

interface CareerRecommendation {
  recommended_career: string;
  confidence: number;
  reasoning: string;
  alternative_careers: string[];
}

interface QualityReport {
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

interface ATSCompliance {
  overall_score: number;
}

interface AssessmentBoxProps {
  improvements: ImprovementsSummary;
  career: CareerRecommendation;
  quality: QualityReport;
  ats: ATSCompliance;
}

export default function AssessmentBox({ improvements, career, quality, ats }: AssessmentBoxProps) {
  const [expandedSections, setExpandedSections] = useState({
    improvements: true,
    career: true,
    quality: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const improvementPercentage = improvements.ats_score_after - improvements.ats_score_before;

  return (
    <div className="space-y-4">
      {/* ATS Score Improvement */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-green-900">
            <TrendingUp className="w-5 h-5" />
            ATS Score Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Before</p>
              <p className="text-2xl font-bold text-green-900">{improvements.ats_score_before}%</p>
            </div>
            <div className="text-center">
              <Badge className="bg-green-600 text-white px-3 py-1">
                +{improvementPercentage}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-green-700">After</p>
              <p className="text-2xl font-bold text-green-900">{improvements.ats_score_after}%</p>
            </div>
          </div>
          <Progress value={improvements.ats_score_after} className="h-2" />
          <p className="text-xs text-green-700">
            {improvements.translation_applied && (
              <>Translated from {improvements.input_language.toUpperCase()} to {improvements.output_language.toUpperCase()}</>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Improvements Made */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => toggleSection('improvements')}
        >
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Improvements Made
            </span>
            {expandedSections.improvements ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.improvements && (
          <CardContent>
            <ul className="space-y-2">
              {improvements.improvements_made.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Career Recommendation */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader 
          className="cursor-pointer hover:bg-purple-100/30 transition-colors"
          onClick={() => toggleSection('career')}
        >
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2 text-purple-900">
              <Target className="w-5 h-5" />
              Career Recommendation
            </span>
            {expandedSections.career ? (
              <ChevronUp className="w-5 h-5 text-purple-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-purple-400" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.career && (
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-purple-900">{career.recommended_career}</h3>
                <Badge variant="secondary" className="bg-purple-200 text-purple-900">
                  {career.confidence}% Match
                </Badge>
              </div>
              <p className="text-sm text-purple-800 leading-relaxed">{career.reasoning}</p>
            </div>
            
            {career.alternative_careers && career.alternative_careers.length > 0 && (
              <div>
                <p className="text-xs font-medium text-purple-700 mb-2">Alternative Careers:</p>
                <ul className="space-y-1">
                  {career.alternative_careers.map((alt, index) => (
                    <li key={index} className="text-xs text-purple-700 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Quality Assessment */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => toggleSection('quality')}
        >
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Quality Assessment ({quality.overall_score}%)
            </span>
            {expandedSections.quality ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </CardTitle>
        </CardHeader>
        {expandedSections.quality && (
          <CardContent className="space-y-4">
            {/* Strengths */}
            {quality.strengths && quality.strengths.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Strengths
                </h4>
                <ul className="space-y-1">
                  {quality.strengths.map((strength, index) => (
                    <li key={index} className="text-xs text-slate-700 pl-5">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {quality.weaknesses && quality.weaknesses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-1">
                  {quality.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-xs text-slate-700 pl-5">
                      • {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {quality.suggestions && quality.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-4 h-4" />
                  Suggestions
                </h4>
                <ul className="space-y-1">
                  {quality.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-xs text-slate-700 pl-5">
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
