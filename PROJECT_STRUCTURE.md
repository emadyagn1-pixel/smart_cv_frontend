# 📂 شرح هيكل المشروع بالتفصيل

دليل شامل لفهم بنية مشروع CV Analyzer وكيفية عمل كل جزء.

---

## 🌳 شجرة المشروع الكاملة

```
cv-analyzer-clean/
│
├── 📁 src/                          # المجلد الرئيسي للكود المصدري
│   │
│   ├── 📁 components/               # مكونات React القابلة لإعادة الاستخدام
│   │   │
│   │   ├── 📁 ui/                  # مكونات واجهة المستخدم الأساسية (Radix UI)
│   │   │   ├── button.tsx          # زر
│   │   │   ├── card.tsx            # بطاقة
│   │   │   ├── input.tsx           # حقل إدخال
│   │   │   ├── select.tsx          # قائمة منسدلة
│   │   │   ├── dialog.tsx          # نافذة منبثقة
│   │   │   ├── tabs.tsx            # تبويبات
│   │   │   ├── progress.tsx        # شريط تقدم
│   │   │   └── ...                 # 40+ مكون آخر
│   │   │
│   │   ├── CVDisplay.tsx           # عرض السيرة الذاتية المحسّنة
│   │   ├── AssessmentBox.tsx       # عرض التقييمات والتحسينات
│   │   ├── PersonalInfoForm.tsx    # نموذج المعلومات الشخصية
│   │   ├── ExperienceForm.tsx      # نموذج الخبرات العملية
│   │   ├── EducationForm.tsx       # نموذج التعليم
│   │   ├── SkillsAndAboutForm.tsx  # نموذج المهارات والنبذة
│   │   ├── TemplateSelector.tsx    # اختيار قالب السيرة الذاتية
│   │   ├── DateInput.tsx           # حقل إدخال التاريخ
│   │   ├── SubscriptionBanner.tsx  # شريط الاشتراك (معطّل حالياً)
│   │   ├── PricingModal.tsx        # نافذة الأسعار (معطّلة حالياً)
│   │   ├── ErrorBoundary.tsx       # معالج الأخطاء
│   │   ├── Map.tsx                 # خريطة (للوظائف القريبة)
│   │   └── ManusDialog.tsx         # نافذة حوار (قديمة)
│   │
│   ├── 📁 pages/                   # صفحات التطبيق
│   │   ├── Home.tsx                # الصفحة الرئيسية (المكون الأكبر - 600+ سطر)
│   │   └── NotFound.tsx            # صفحة 404
│   │
│   ├── 📁 lib/                     # وظائف مساعدة ومكتبات
│   │   ├── utils.ts                # وظائف مساعدة عامة (cn, clsx)
│   │   ├── cvTemplates.ts          # قوالب السيرة الذاتية (blue, green, modern, etc.)
│   │   ├── subscription.ts         # نظام الاشتراك (معطّل حالياً)
│   │   └── 📁 types/
│   │       └── subscription.ts     # أنواع TypeScript للاشتراك
│   │
│   ├── 📁 hooks/                   # React Hooks مخصصة
│   │   ├── useMobile.tsx           # كشف الأجهزة المحمولة
│   │   ├── useComposition.ts       # معالجة الإدخال المركب
│   │   └── usePersistFn.ts         # حفظ الدوال في الذاكرة
│   │
│   ├── 📁 contexts/                # React Contexts
│   │   └── ThemeContext.tsx        # إدارة الثيم (Light/Dark)
│   │
│   ├── 📁 types/                   # TypeScript Type Definitions
│   │   └── manualForm.ts           # أنواع نموذج الإدخال اليدوي
│   │
│   ├── App.tsx                     # المكون الرئيسي للتطبيق
│   ├── main.tsx                    # نقطة الدخول (Entry Point)
│   ├── const.ts                    # ثوابت التطبيق
│   ├── index.css                   # الأنماط الرئيسية (Tailwind)
│   └── print.css                   # أنماط الطباعة (PDF Export)
│
├── 📁 public/                      # ملفات ثابتة (صور، أيقونات، إلخ)
│   └── .gitkeep                    # ملف وهمي لحفظ المجلد في Git
│
├── 📁 shared/                      # ملفات مشتركة بين Frontend و Backend
│   └── const.ts                    # ثوابت مشتركة (COOKIE_NAME, etc.)
│
├── 📄 index.html                   # ملف HTML الرئيسي
├── 📄 package.json                 # تبعيات المشروع وأوامر npm
├── 📄 vite.config.ts               # إعدادات Vite (Build Tool)
├── 📄 tsconfig.json                # إعدادات TypeScript
├── 📄 tsconfig.node.json           # إعدادات TypeScript للـ Node.js
├── 📄 components.json              # إعدادات Radix UI Components
├── 📄 vercel.json                  # إعدادات Vercel (Deployment)
├── 📄 .gitignore                   # ملفات Git المستبعدة
├── 📄 .env.example                 # مثال للمتغيرات البيئية
└── 📄 README.md                    # وثائق المشروع
```

---

## 📄 شرح الملفات الرئيسية

### 1. `src/main.tsx` - نقطة الدخول

**الوظيفة**: أول ملف يتم تنفيذه، يقوم بتحميل React في DOM.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**ماذا يحدث هنا؟**
1. استيراد React و ReactDOM
2. استيراد المكون الرئيسي `App`
3. استيراد الأنماط الرئيسية
4. تحميل `App` في عنصر `#root` في HTML

---

### 2. `src/App.tsx` - المكون الرئيسي

**الوظيفة**: إعداد Routing والـ Providers.

```tsx
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
}
```

**المسؤوليات**:
- إعداد Routing (Wouter)
- توفير Theme Context
- معالجة الأخطاء (ErrorBoundary)

---

### 3. `src/pages/Home.tsx` - الصفحة الرئيسية

**الوظيفة**: المكون الأكبر والأهم، يحتوي على كل منطق التطبيق.

**الأقسام الرئيسية**:

#### أ. State Management (الحالة)
```tsx
const [inputMode, setInputMode] = useState<"file" | "manual">("file");
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<CVResult | null>(null);
const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
// ... المزيد من الحالات
```

#### ب. Form Handling (النماذج)
```tsx
const [manualForm, setManualForm] = useState<ManualCVForm>({
  personalInfo: { ... },
  experiences: [],
  education: [],
  skills: [],
  aboutMe: ""
});
```

#### ج. API Communication (الاتصال بـ API)
```tsx
const handleAnalyze = async () => {
  const formData = new FormData();
  formData.append("cv_file", selectedFile);
  formData.append("output_language", selectedLanguage);
  
  const response = await fetch(
    "https://smart-ats-c-v.onrender.com/analyze-and-rewrite/",
    { method: "POST", body: formData }
  );
  
  const data = await response.json();
  setResult(data);
};
```

#### د. PDF Export (تصدير PDF)
```tsx
const handleExportPDF = () => {
  window.print(); // يفتح نافذة الطباعة
};
```

**البنية العامة**:
```tsx
<div className="container">
  {/* Header */}
  <header>...</header>
  
  {/* Input Mode Selector */}
  <Tabs value={inputMode} onValueChange={setInputMode}>
    <TabsList>
      <TabsTrigger value="file">Upload CV File</TabsTrigger>
      <TabsTrigger value="manual">Manual Input</TabsTrigger>
    </TabsList>
  </Tabs>
  
  {/* File Upload OR Manual Form */}
  {inputMode === "file" ? (
    <FileUploadSection />
  ) : (
    <ManualFormSection />
  )}
  
  {/* Analyze Button */}
  <Button onClick={handleAnalyze}>Analyze CV</Button>
  
  {/* Results */}
  {result && (
    <>
      <AssessmentBox data={result} />
      <CVDisplay data={result} />
    </>
  )}
</div>
```

---

### 4. `src/components/CVDisplay.tsx` - عرض السيرة الذاتية

**الوظيفة**: عرض السيرة الذاتية المحسّنة بتصميم احترافي.

**المميزات**:
- دعم قوالب متعددة (blue, green, modern, minimal)
- تصميم responsive
- جاهز للطباعة (print-friendly)
- دعم RTL للعربية

**البنية**:
```tsx
<Card id="cv-display-card">
  {/* Header with Name & Contact */}
  <CardHeader className={`bg-${template.primaryColor}`}>
    <h1>{cvData.name}</h1>
    <p>{cvData.email} | {cvData.phone}</p>
  </CardHeader>
  
  <CardContent>
    {/* Summary */}
    <section>
      <h2>Professional Summary</h2>
      <p>{cvData.summary}</p>
    </section>
    
    {/* Skills */}
    <section>
      <h2>Technical Skills</h2>
      <div className="flex flex-wrap gap-2">
        {cvData.skills.map(skill => (
          <Badge>{skill}</Badge>
        ))}
      </div>
    </section>
    
    {/* Experience */}
    <section>
      <h2>Work Experience</h2>
      {cvData.experience.map(exp => (
        <div>
          <h3>{exp.position} at {exp.company}</h3>
          <p>{exp.duration}</p>
          <p>{exp.rewritten_description}</p>
        </div>
      ))}
    </section>
    
    {/* Education */}
    <section>...</section>
    
    {/* Projects */}
    <section>...</section>
  </CardContent>
</Card>
```

---

### 5. `src/components/AssessmentBox.tsx` - عرض التقييمات

**الوظيفة**: عرض نتائج تحليل ATS والتحسينات.

**الأقسام**:

#### أ. ATS Score Comparison
```tsx
<div className="grid grid-cols-2 gap-4">
  <div>
    <p>Before: {atsScoreBefore}%</p>
    <Progress value={atsScoreBefore} />
  </div>
  <div>
    <p>After: {atsScoreAfter}%</p>
    <Progress value={atsScoreAfter} />
  </div>
</div>
```

#### ب. Improvements Made
```tsx
<ul>
  {improvementsMade.map(improvement => (
    <li>✓ {improvement}</li>
  ))}
</ul>
```

#### ج. Career Recommendation
```tsx
<div>
  <h3>Recommended Career</h3>
  <p>{recommendedCareer}</p>
  <p>Confidence: {confidence}%</p>
  <p>Reasoning: {reasoning}</p>
</div>
```

#### د. Quality Report
```tsx
<div>
  <h3>Strengths</h3>
  <ul>{strengths.map(s => <li>{s}</li>)}</ul>
  
  <h3>Weaknesses</h3>
  <ul>{weaknesses.map(w => <li>{w}</li>)}</ul>
  
  <h3>Suggestions</h3>
  <ul>{suggestions.map(s => <li>{s}</li>)}</ul>
</div>
```

---

### 6. `src/lib/cvTemplates.ts` - قوالب السيرة الذاتية

**الوظيفة**: تعريف الألوان والأنماط لكل قالب.

```tsx
export const cvTemplates = {
  blue: {
    name: "Professional Blue",
    primaryColor: "blue-600",
    secondaryColor: "blue-100",
    accentColor: "blue-500",
    textColor: "gray-800",
    badgeVariant: "default"
  },
  green: {
    name: "Nature Green",
    primaryColor: "green-600",
    secondaryColor: "green-100",
    // ...
  },
  modern: {
    name: "Modern Purple",
    primaryColor: "purple-600",
    // ...
  },
  minimal: {
    name: "Minimal Gray",
    primaryColor: "gray-700",
    // ...
  }
};
```

---

## 🔄 تدفق البيانات (Data Flow)

### السيناريو 1: رفع ملف CV

```
1. المستخدم يختار ملف PDF/DOCX
   ↓
2. handleFileChange() يحفظ الملف في state
   ↓
3. المستخدم ينقر "Analyze CV"
   ↓
4. handleAnalyze() يرسل الملف إلى Backend API
   ↓
5. Backend يحلل الملف ويعيد JSON
   ↓
6. setResult(data) يحفظ النتيجة في state
   ↓
7. React يعيد رسم المكونات
   ↓
8. AssessmentBox و CVDisplay يعرضان النتائج
```

### السيناريو 2: الإدخال اليدوي

```
1. المستخدم يملأ النماذج (PersonalInfoForm, ExperienceForm, etc.)
   ↓
2. كل نموذج يحدّث manualForm state
   ↓
3. المستخدم ينقر "Analyze CV"
   ↓
4. handleAnalyze() يحول البيانات إلى PDF باستخدام jsPDF
   ↓
5. يرسل PDF إلى Backend API
   ↓
6. ... نفس الخطوات السابقة
```

---

## 🎨 نظام التصميم (Design System)

### الألوان (Colors)

| اللون | الاستخدام |
|------|----------|
| `blue-600` | Primary (الأزرار الرئيسية) |
| `gray-800` | النص الأساسي |
| `gray-400` | النص الثانوي |
| `green-500` | Success (نجاح) |
| `red-500` | Error (خطأ) |
| `yellow-500` | Warning (تحذير) |

### المسافات (Spacing)

| الفئة | القيمة |
|------|--------|
| `space-y-2` | 0.5rem |
| `space-y-4` | 1rem |
| `gap-2` | 0.5rem |
| `p-4` | 1rem padding |
| `m-4` | 1rem margin |

### الخطوط (Typography)

| الفئة | الحجم |
|------|------|
| `text-sm` | 0.875rem |
| `text-base` | 1rem |
| `text-lg` | 1.125rem |
| `text-xl` | 1.25rem |
| `text-2xl` | 1.5rem |

---

## 🔧 إعدادات المشروع

### `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss(), jsxLocPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),        // @/components/...
      "@shared": path.resolve(__dirname, "shared") // @shared/const
    },
  },
  build: {
    outDir: "dist",      // مجلد البناء
    emptyOutDir: true,   // مسح المجلد قبل البناء
  },
});
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

---

## 📦 التبعيات الرئيسية

### UI Libraries

| المكتبة | الوصف |
|---------|-------|
| `react` | مكتبة UI الأساسية |
| `@radix-ui/*` | مكونات UI متقدمة |
| `tailwindcss` | Framework CSS |
| `lucide-react` | أيقونات |

### Forms & Validation

| المكتبة | الوصف |
|---------|-------|
| `react-hook-form` | إدارة النماذج |
| `zod` | التحقق من البيانات |

### Utilities

| المكتبة | الوصف |
|---------|-------|
| `axios` | HTTP Client |
| `jspdf` | توليد PDF |
| `html2canvas` | تحويل HTML إلى صورة |
| `wouter` | Routing خفيف |
| `sonner` | Toast Notifications |

---

## 🚀 أوامر npm Scripts

```json
{
  "scripts": {
    "dev": "vite",                    // تشغيل Development Server
    "build": "vite build",            // بناء للإنتاج
    "preview": "vite preview",        // معاينة النسخة المبنية
    "check": "tsc --noEmit"           // فحص TypeScript errors
  }
}
```

---

## 📝 ملاحظات مهمة

### 1. الملفات المعطّلة حالياً

- `SubscriptionBanner.tsx`: نظام الاشتراك معطّل
- `PricingModal.tsx`: نافذة الأسعار معطّلة
- `lib/subscription.ts`: وظائف الاشتراك معطّلة

### 2. الملفات القديمة (يمكن حذفها)

- `ManusDialog.tsx`: خاص بـ Manus فقط
- `Map.tsx`: ميزة الوظائف القريبة (غير مفعّلة بالكامل)

### 3. الملفات الحساسة (لا ترفعها على Git)

- `.env`: متغيرات البيئة المحلية
- `node_modules/`: التبعيات
- `dist/`: ملفات البناء

---

## 🎯 نقاط التوسع المستقبلية

### 1. إضافة صفحات جديدة

```tsx
// src/pages/About.tsx
export default function About() {
  return <div>About Page</div>;
}

// في App.tsx
<Route path="/about" component={About} />
```

### 2. إضافة API جديد

```tsx
// src/lib/api.ts
export async function fetchJobListings(postalCode: string) {
  const response = await axios.get(`${API_URL}/jobs`, {
    params: { postal_code: postalCode }
  });
  return response.data;
}
```

### 3. إضافة قالب جديد

```tsx
// في src/lib/cvTemplates.ts
export const cvTemplates = {
  // ... القوالب الموجودة
  orange: {
    name: "Vibrant Orange",
    primaryColor: "orange-600",
    secondaryColor: "orange-100",
    // ...
  }
};
```

---

**🎓 الآن لديك فهم شامل لبنية المشروع!**

يمكنك البدء في التعديل والتطوير بثقة.

---

**آخر تحديث**: نوفمبر 2025  
**الإصدار**: 1.0.0
