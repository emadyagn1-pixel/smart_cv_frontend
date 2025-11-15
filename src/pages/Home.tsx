import { useState, useEffect } from "react";
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
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
import { ManualCVForm, PersonalInfo, WorkExperience, Education } from "@/types/manualForm";
import { canAnalyze, incrementUsage } from "@/lib/subscription";
import { Calendar } from "lucide-react";

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
  const [workDates, setWorkDates] = useState({
    startDate: "",
    endDate: ""
  });
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Manual form state
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
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword"
      ];
      
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or DOCX file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      toast.success(`File "${file.name}" selected`);
    }
  };

  const handleAnalyze = async () => {
    // Check subscription limits - TEMPORARILY DISABLED
    // if (!canAnalyze()) {
    //   toast.error("You've reached your monthly limit. Upgrade to Premium for unlimited analyses!");
    //   setShowPricingModal(true);
    //   return;
    // }

    if (inputMode === "file" && !selectedFile) {
      toast.error("Please select a CV file first");
      return;
    }
    
    if (inputMode === "manual") {
      // Validate manual form
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
      } else if (inputMode === "manual") {
        // Convert manual form to text format
        // Convert manual form data to PDF
        const doc = new jsPDF();
        let yPosition = 20;
        const lineHeight = 7;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        
        // Helper function to add text with auto page break
        const addText = (text: string, fontSize = 12, isBold = false) => {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFontSize(fontSize);
          if (isBold) {
            doc.setFont('helvetica', 'bold');
          } else {
            doc.setFont('helvetica', 'normal');
          }
          const lines = doc.splitTextToSize(text, 170);
          doc.text(lines, 20, yPosition);
          yPosition += lines.length * lineHeight;
        };
        
        // Personal Info
        addText(`${manualForm.personalInfo.firstName} ${manualForm.personalInfo.lastName}`, 16, true);
        addText(`${manualForm.personalInfo.email}`);
        addText(`${manualForm.personalInfo.phone}`);
        addText(`${manualForm.personalInfo.address}, ${manualForm.personalInfo.postalCode} ${manualForm.personalInfo.city}, ${manualForm.personalInfo.country}`);
        yPosition += 5;
        
        // About Me
        if (manualForm.aboutMe) {
          addText('ABOUT ME', 14, true);
          addText(manualForm.aboutMe);
          yPosition += 5;
        }
        
        // Skills
        if (manualForm.skills.length > 0) {
          addText('SKILLS', 14, true);
          addText(manualForm.skills.join(', '));
          yPosition += 5;
        }
        
        // Work Experience
        if (manualForm.experiences.length > 0) {
          addText('WORK EXPERIENCE', 14, true);
          manualForm.experiences.forEach((exp: any) => {
            addText(`${exp.jobTitle} at ${exp.company}`, 12, true);
            addText(`${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}`);
            addText(exp.industry);
            if (exp.responsibilities) {
              addText(exp.responsibilities);
            }
            yPosition += 3;
          });
        }
        
        // Education
        if (manualForm.education.length > 0) {
          addText('EDUCATION', 14, true);
          manualForm.education.forEach((edu: any) => {
            addText(`${edu.degree} in ${edu.fieldOfStudy}`, 12, true);
            addText(edu.university);
            addText(`${edu.startDate} - ${edu.isCurrentlyStudying ? 'Present' : edu.endDate}`);
            yPosition += 3;
          });
        }
        
        // Convert PDF to blob and create file
        const pdfBlob = doc.output('blob');
        const file = new File([pdfBlob], 'cv_manual_input.pdf', { type: 'application/pdf' });
        formData.append('cv_file', file);
      }
      formData.append("output_language", selectedLanguage);
      formData.append("github_link", socialLinks.github);
      formData.append("linkedin_link", socialLinks.linkedin);
      formData.append("twitter_link", socialLinks.kaggle);
      formData.append("portfolio_link", socialLinks.portfolio);
      
      // Send postal code for job matching (if manual input)
      if (inputMode === "manual" && manualForm.personalInfo.postalCode) {
        formData.append("postal_code", manualForm.personalInfo.postalCode);
      }

      // Show info toast for first request (Render free tier may take 30-60s to wake up)
      toast.info("Analyzing your CV... This may take up to 60 seconds on first request.");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout

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
      // incrementUsage(); // TEMPORARILY DISABLED - Increment usage counter
      toast.success("CV analyzed successfully!");
    } catch (error: any) {
      console.error("Error analyzing CV:", error);
      if (error.name === 'AbortError') {
        toast.error("Request timeout. The server took too long to respond. Please try again.");
      } else if (error.message.includes('Failed to fetch')) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error(`Failed to analyze CV: ${error.message}`);
      }
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
        {/* Subscription Banner - TEMPORARILY DISABLED */}
        {/* <div className="max-w-2xl mx-auto mb-6">
          <SubscriptionBanner onUpgrade={() => setShowPricingModal(true)} />
        </div> */}

        {/* Upload Section */}
        {!result && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Your CV</CardTitle>
              <CardDescription>
                Upload your resume in PDF or DOCX format and select your preferred output language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Output Language
                </label>
                <Select
                  value={selectedLanguage}
                  onValueChange={(value) => setSelectedLanguage(value as Language)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="de">🇩🇪 German (Deutsch)</SelectItem>
                    <SelectItem value="ar">🇸🇦 Arabic (العربية)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Input Mode Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Input Method
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={inputMode === "file" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setInputMode("file")}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    type="button"
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
                <label className="text-sm font-medium text-slate-700">
                  CV File
                </label>
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
              <p className="text-xs text-slate-500">
                Supported formats: PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
              )}

              {/* Manual Form Input */}
              {inputMode === "manual" && (
                <div className="space-y-6">
                  {/* Language Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Input Language</Label>
                      <Select
                        value={manualForm.inputLanguage}
                        onValueChange={(val: "en" | "de" | "ar") =>
                          setManualForm({ ...manualForm, inputLanguage: val })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">Deutsch (German)</SelectItem>
                          <SelectItem value="ar">العربية (Arabic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Output Language</Label>
                      <Select
                        value={manualForm.outputLanguage}
                        onValueChange={(val: "en" | "de" | "ar") =>
                          setManualForm({ ...manualForm, outputLanguage: val })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">Deutsch (German)</SelectItem>
                          <SelectItem value="ar">العربية (Arabic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

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

                  {/* Skills & About Me */}
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

              {/* Template Selector */}
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />

            {/* Social Links */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">
                Social Links (Optional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-500" />
                  <Input
                    placeholder="GitHub URL"
                    value={socialLinks.github}
                    onChange={(e) => setSocialLinks({...socialLinks, github: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-slate-500" />
                  <Input
                    placeholder="LinkedIn URL"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <Input
                    placeholder="Portfolio URL"
                    value={socialLinks.portfolio}
                    onChange={(e) => setSocialLinks({...socialLinks, portfolio: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-500" />
                  <Input
                    placeholder="Kaggle URL"
                    value={socialLinks.kaggle}
                    onChange={(e) => setSocialLinks({...socialLinks, kaggle: e.target.value})}
                  />
                </div>
              </div>
            </div>

              {/* Analyze Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleAnalyze}
                disabled={(inputMode === "file" && !selectedFile) || (inputMode === "manual" && !manualForm.personalInfo.email) || loading}
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

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-6 no-print">          <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setSelectedFile(null);
                  setCvText("");
                }}
              >
                ← Analyze Another CV
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  window.print();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('cv-display');
                  if (!element) {
                    toast.error("CV display not found");
                    return;
                  }
                  
                  // Create a print-friendly version
                  const printWindow = window.open('', '_blank');
                  if (!printWindow) {
                    toast.error("Please allow popups to print");
                    return;
                  }
                  
                  printWindow.document.write('<html><head><title>Print CV</title>');
                  printWindow.document.write('<style>');
                  printWindow.document.write('@media print { body { margin: 0; padding: 20mm; } }');
                  printWindow.document.write('</style>');
                  printWindow.document.write('</head><body>');
                  printWindow.document.write(element.innerHTML);
                  printWindow.document.write('</body></html>');
                  printWindow.document.close();
                  
                  setTimeout(() => {
                    printWindow.print();
                  }, 500);
                }}
              >
                <Type className="w-4 h-4 mr-2" />
                Print CV
              </Button>
            </div>

            {/* CV Display and Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main CV Display - Takes 2 columns */}
              <div className="lg:col-span-2">
                <div id="cv-display">
                  <CVDisplay cv={result.final_cv} templateId={selectedTemplate} />
                </div>
              </div>

              {/* Assessment Box - Takes 1 column */}
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
        )}
      </main>

      {/* Pricing Modal */}
      <PricingModal open={showPricingModal} onClose={() => setShowPricingModal(false)} />
    </div>
  );
}
