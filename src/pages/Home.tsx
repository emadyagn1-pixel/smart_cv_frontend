
import { useState, useEffect } from "react";
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Loader2, Download, Github, Linkedin, Globe, Award, Type } from "lucide-react";
import { toast } from "sonner";
import CVDisplay from "@/components/CVDisplay";
import AssessmentBox from "@/components/AssessmentBox";
import TemplateSelector from "@/components/TemplateSelector";
import DateInput from "@/components/DateInput";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsAndAboutForm from "@/components/SkillsAndAboutForm";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import PricingModal from "@/components/PricingModal";
import CVSidebar from "@/components/CVSidebar";
import LanguageSelector from "@/components/LanguageSelector";
import { ManualCVForm } from "@/types/manualForm";
import { translateCV } from "@/lib/translateCV";

type Language = "en" | "de" | "ar";

interface CVResult {
  final_cv: {
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
  };
  improvements_summary: {
    ats_score_before: number;
    ats_score_after: number;
    improvements_made: string[];
    translation_applied: boolean;
    input_language: string;
    output_language: string;
  };
  career_recommendation: {
    recommended_career: string;
    confidence: number;
    reasoning: string;
    alternative_careers: string[];
  };
  quality_report: {
    overall_score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  ats_compliance: {
    overall_score: number;
  };
}

export default function Home() {
  const [inputMode, setInputMode] = useState<"file" | "manual">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CVResult | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    portfolio: "",
    kaggle: ""
  });

  const [selectedTemplate, setSelectedTemplate] = useState("blue");
  const [workDates, setWorkDates] = useState({ startDate: "", endDate: "" });
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedCV, setTranslatedCV] = useState<any>(null);

  const handleLanguageChange = async (newLanguage: string) => {
    if (!result) return;
    
    setSelectedLanguage(newLanguage as Language);
    
    // If changing to English, use original CV
    if (newLanguage === "en") {
      setTranslatedCV(null);
      return;
    }
    
    // Translate CV to new language
    setIsTranslating(true);
    try {
      const translated = await translateCV(result.final_cv, newLanguage);
      setTranslatedCV(translated);
      toast.success(`CV translated to ${newLanguage.toUpperCase()}`);
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate CV");
    } finally {
      setIsTranslating(false);
    }
  };

  const exportToPDF = async () => {
    const cvElement = document.getElementById("cv-display");
    if (!cvElement) {
      toast.error("CV display not found");
      return;
    }

    try {
      toast.info("جاري تحضير PDF...");

      // استخدام html2canvas-pro الذي يدعم oklch
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });



      // تحويل اللقطة إلى PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
        undefined,
        'FAST'
      );

      pdf.save(`CV_${result?.final_cv.name || 'download'}.pdf`);
      toast.success('PDF exported successfully!');

    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  // Manual form
  const [manualForm, setManualForm] = useState<ManualCVForm>({
    personalInfo: {
      firstName: "",
      lastName: "",
      birthDate: "",
      birthPlace: "",
      address: "",
      postalCode: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      photo: null,
    },
    experiences: [
      {
        id: "1",
        jobTitle: "",
        company: "",
        industry: "",
        responsibilities: "",
        startDate: "",
        endDate: "",
        isCurrentJob: false,
      },
    ],
    education: [
      {
        id: "1",
        fieldOfStudy: "",
        university: "",
        degree: "",
        startDate: "",
        endDate: "",
        isCurrentlyStudying: false,
      },
    ],
    skills: [],
    aboutMe: "",
    inputLanguage: "en",
    outputLanguage: "en",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or DOCX file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    toast.success(`File "${file.name}" selected`);
  };

  const handleAnalyze = async () => {

    if (inputMode === "file" && !selectedFile) {
      toast.error("Please select a CV file first");
      return;
    }

    if (inputMode === "manual") {
      if (!manualForm.personalInfo.firstName || !manualForm.personalInfo.lastName || !manualForm.personalInfo.email) {
        toast.error("Please fill in required personal information");
        return;
      }
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();

      if (inputMode === "file" && selectedFile) {
        formData.append("cv_file", selectedFile);
      }

      // Always request English output from Backend
      formData.append("output_language", "en");

      // API request
      toast.info("Analyzing your CV... This may take up to 60 seconds on first request.");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const response = await fetch(
        "https://smart-ats-c-v.onrender.com/analyze-and-rewrite/",
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CVResult = await response.json();
      setResult(data);

      // إعادة تعيين اللغة للإنجليزية بعد التحليل
      setSelectedLanguage("en");
      setTranslatedCV(null);

      toast.success("CV analyzed successfully!");
    } catch (error: any) {
      console.error("Error analyzing CV:", error);
      if (error.name === "AbortError") toast.error("Request timeout.");
      else toast.error("Failed to analyze CV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CV Analyzer</h1>
              <p className="text-sm text-slate-600">AI-Powered Resume Enhancement</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">

        {/* Upload Section */}
        {!result && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Your CV</CardTitle>
              <CardDescription>
                Upload your resume in PDF or DOCX format for AI-powered analysis
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* Input Method */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Input Method</label>

                <div className="flex gap-2">
                  <Button
                    variant={inputMode === "file" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setInputMode("file")}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>

                  <Button
                    variant={inputMode === "manual" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setInputMode("manual")}
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Manual Input
                  </Button>
                </div>
              </div>

              {/* File Upload */}
              {inputMode === "file" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">CV File</label>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {selectedFile ? selectedFile.name : "Choose File"}
                    </Button>

                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <p className="text-xs text-slate-500">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                </div>
              )}

              {/* MANUAL INPUT */}
              {inputMode === "manual" && (
                <div className="space-y-6">

                  {/* Personal Info */}
                  <PersonalInfoForm
                    data={manualForm.personalInfo}
                    onChange={(data: any) =>
                      setManualForm({ ...manualForm, personalInfo: data })
                    }
                    language={manualForm.inputLanguage}
                  />

                  {/* Experience */}
                  <ExperienceForm
                    experiences={manualForm.experiences}
                    onChange={(data: any) =>
                      setManualForm({ ...manualForm, experiences: data })
                    }
                    language={manualForm.inputLanguage}
                  />

                  {/* Education */}
                  <EducationForm
                    education={manualForm.education}
                    onChange={(data: any) =>
                      setManualForm({ ...manualForm, education: data })
                    }
                    language={manualForm.inputLanguage}
                  />

                  {/* Skills / About */}
                  <SkillsAndAboutForm
                    skills={manualForm.skills}
                    aboutMe={manualForm.aboutMe}
                    onSkillsChange={(skills: any) =>
                      setManualForm({ ...manualForm, skills })
                    }
                    onAboutMeChange={(aboutMe: any) =>
                      setManualForm({ ...manualForm, aboutMe })
                    }
                    language={manualForm.inputLanguage}
                  />

                </div>
              )}

              {/* Templates */}
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />

              {/* Social Links */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Social Links (Optional)</label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-500" />
                    <Input
                      placeholder="GitHub URL"
                      value={socialLinks.github}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, github: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-slate-500" />
                    <Input
                      placeholder="LinkedIn URL"
                      value={socialLinks.linkedin}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <Input
                      placeholder="Portfolio URL"
                      value={socialLinks.portfolio}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, portfolio: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-500" />
                    <Input
                      placeholder="Kaggle URL"
                      value={socialLinks.kaggle}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, kaggle: e.target.value })
                      }
                    />
                  </div>

                </div>
              </div>

              {/* Analyze Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleAnalyze}
                disabled={
                  (inputMode === "file" && !selectedFile) ||
                  (inputMode === "manual" && !manualForm.personalInfo.email) ||
                  loading
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Analyze CV
                  </>
                )}
              </Button>

            </CardContent>
          </Card>
        )}

        {/* RESULTS */}
        {result && (
          <div className="space-y-6">

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mb-6 no-print items-center justify-between">
              
              <div className="flex gap-3">

              {/* Analyze Another CV */}
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setSelectedFile(null);
                  setCvText("");
                }}
              >
                ← Analyze Another CV
              </Button>

              {/* Export PDF */}
              <Button
                variant="default"
                onClick={exportToPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </Button>

              {/* Print CV */}
              <Button
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('cv-display');
                  if (!element) {
                    toast.error("CV display not found");
                    return;
                  }
                  const printWindow = window.open('', '_blank');
                  if (!printWindow) {
                    toast.error("Please allow popups to print");
                    return;
                  }

                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Print CV</title>
                        <style>
                          @media print { body { margin: 0; padding: 20mm; } }
                        </style>
                      </head>
                      <body>${element.innerHTML}</body>
                    </html>
                  `);

                  printWindow.document.close();
                  setTimeout(() => printWindow.print(), 500);
                }}
              >
                <Type className="w-4 h-4 mr-2" />
                Print CV
              </Button>
              </div>

              {/* Language Selector */}
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />

              {/* Translation Loading Indicator */}
              {isTranslating && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Translating CV...</span>
                </div>
              )}

            </div>

            {/* CV DISPLAY WITH SIDEBAR */}
            <div className="flex gap-6">
              
              {/* LEFT SIDEBAR */}
              <div className="flex-shrink-0">
                <CVSidebar cv={result.final_cv} />
              </div>

              {/* MAIN CONTENT */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* CV DISPLAY (2 columns) */}
                <div className="lg:col-span-2">
                  <div id="cv-display">
                    <CVDisplay cv={translatedCV || result.final_cv} templateId={selectedTemplate} outputLanguage={selectedLanguage} />
                  </div>
                </div>

                {/* RIGHT COLUMN - Assessment */}
                <div className="lg:col-span-1 no-print">
                  <AssessmentBox
                    improvements={result.improvements_summary}
                    career={result.career_recommendation}
                    quality={result.quality_report}
                    ats={result.ats_compliance}
                  />
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* PRICING MODAL */}
      <PricingModal
        open={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />

    </div>
  );
}