# 💻 دليل إعداد Visual Studio Code للمشروع

دليل شامل لإعداد بيئة التطوير في Visual Studio Code لمشروع CV Analyzer.

---

## 📥 الخطوة 1: تثبيت Visual Studio Code

### تحميل VS Code

1. اذهب إلى [code.visualstudio.com](https://code.visualstudio.com)
2. حمّل النسخة المناسبة لنظام التشغيل:
   - **Windows**: `.exe` installer
   - **Mac**: `.dmg` file
   - **Linux**: `.deb` أو `.rpm`
3. ثبّت البرنامج

---

## 🔌 الخطوة 2: تثبيت الإضافات الضرورية

افتح VS Code واذهب إلى **Extensions** (Ctrl+Shift+X أو Cmd+Shift+X على Mac)

### الإضافات الأساسية

#### 1. ES7+ React/Redux/React-Native snippets
- **ID**: `dsznajder.es7-react-js-snippets`
- **الفائدة**: اختصارات لكتابة كود React بسرعة

```
تثبيت: ابحث عن "ES7 React" في Extensions
```

#### 2. Tailwind CSS IntelliSense
- **ID**: `bradlc.vscode-tailwindcss`
- **الفائدة**: autocomplete لـ Tailwind classes

```
تثبيت: ابحث عن "Tailwind CSS IntelliSense"
```

#### 3. TypeScript Vue Plugin (Volar)
- **ID**: `Vue.volar`
- **الفائدة**: دعم أفضل لـ TypeScript

```
تثبيت: ابحث عن "Volar"
```

#### 4. Prettier - Code formatter
- **ID**: `esbenp.prettier-vscode`
- **الفائدة**: تنسيق الكود تلقائياً

```
تثبيت: ابحث عن "Prettier"
```

#### 5. GitLens
- **ID**: `eamodio.gitlens`
- **الفائدة**: مميزات Git متقدمة

```
تثبيت: ابحث عن "GitLens"
```

### إضافات إضافية موصى بها

#### 6. Auto Rename Tag
- **ID**: `formulahendry.auto-rename-tag`
- **الفائدة**: تعديل closing tag تلقائياً

#### 7. Path Intellisense
- **ID**: `christian-kohler.path-intellisense`
- **الفائدة**: autocomplete للمسارات

#### 8. Error Lens
- **ID**: `usernamehw.errorlens`
- **الفائدة**: عرض الأخطاء مباشرة في الكود

#### 9. Console Ninja
- **ID**: `WallabyJs.console-ninja`
- **الفائدة**: عرض console.log مباشرة في VS Code

---

## ⚙️ الخطوة 3: إعدادات VS Code

### إنشاء ملف settings.json

1. افتح Command Palette: `Ctrl+Shift+P` (أو `Cmd+Shift+P` على Mac)
2. ابحث عن: `Preferences: Open User Settings (JSON)`
3. أضف الإعدادات التالية:

```json
{
  // تنسيق تلقائي عند الحفظ
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  
  // إعدادات Prettier
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  // Tailwind CSS
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  
  // TypeScript
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  
  // Git
  "git.autofetch": true,
  "git.confirmSync": false,
  
  // عام
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "editor.minimap.enabled": true,
  "editor.lineNumbers": "on",
  "editor.rulers": [80, 120],
  "workbench.colorTheme": "Default Dark+",
  "terminal.integrated.fontSize": 14
}
```

---

## 📁 الخطوة 4: فتح المشروع

### طريقة 1: من Terminal

```bash
# انتقل إلى مجلد المشروع
cd path/to/cv-analyzer-clean

# افتح VS Code
code .
```

### طريقة 2: من VS Code

1. افتح VS Code
2. **File** → **Open Folder**
3. اختر مجلد `cv-analyzer-clean`

---

## 🏗️ الخطوة 5: فهم هيكل المشروع

### الملفات الرئيسية

| الملف | الوصف |
|------|-------|
| `package.json` | تبعيات المشروع وأوامر npm |
| `vite.config.ts` | إعدادات Vite |
| `tsconfig.json` | إعدادات TypeScript |
| `vercel.json` | إعدادات Vercel |
| `.gitignore` | ملفات Git المستبعدة |
| `README.md` | وثائق المشروع |

### المجلدات الرئيسية

```
src/
├── components/      # مكونات React قابلة لإعادة الاستخدام
│   ├── ui/         # مكونات واجهة المستخدم الأساسية (Radix UI)
│   ├── CVDisplay.tsx
│   ├── AssessmentBox.tsx
│   └── ...
├── pages/          # صفحات التطبيق
│   ├── Home.tsx    # الصفحة الرئيسية (المكون الأكبر)
│   └── NotFound.tsx
├── lib/            # وظائف مساعدة
│   ├── utils.ts
│   ├── cvTemplates.ts
│   └── subscription.ts
├── hooks/          # React Hooks مخصصة
├── contexts/       # React Contexts (مثل ThemeContext)
├── types/          # TypeScript type definitions
└── ...
```

---

## 🔧 الخطوة 6: أوامر Terminal في VS Code

### فتح Terminal المدمج

**Ctrl+`** (أو **Cmd+`** على Mac)

### الأوامر الأساسية

```bash
# تثبيت التبعيات
pnpm install

# تشغيل المشروع (Development)
pnpm dev

# بناء المشروع (Production)
pnpm build

# معاينة النسخة المبنية
pnpm preview

# فحص TypeScript errors
pnpm check
```

---

## 🎨 الخطوة 7: اختصارات لوحة المفاتيح المفيدة

### اختصارات عامة

| الاختصار | الوظيفة |
|----------|---------|
| `Ctrl+P` | البحث عن ملف |
| `Ctrl+Shift+P` | Command Palette |
| `Ctrl+B` | إخفاء/إظهار Sidebar |
| `Ctrl+J` | إخفاء/إظهار Terminal |
| `Ctrl+/` | تعليق/إلغاء تعليق السطر |
| `Alt+↑/↓` | نقل السطر للأعلى/الأسفل |
| `Shift+Alt+↑/↓` | نسخ السطر للأعلى/الأسفل |
| `Ctrl+D` | تحديد الكلمة التالية المطابقة |

### اختصارات React/TypeScript

| الاختصار | الوظيفة |
|----------|---------|
| `F12` | الذهاب إلى التعريف |
| `Alt+F12` | معاينة التعريف |
| `Shift+F12` | عرض جميع المراجع |
| `F2` | إعادة تسمية الرمز |
| `Ctrl+Space` | Autocomplete |

---

## 🧩 الخطوة 8: Snippets مفيدة

### React Snippets (مع ES7+ extension)

| Snippet | الكود الناتج |
|---------|-------------|
| `rafce` | React Arrow Function Component Export |
| `useState` | useState hook |
| `useEffect` | useEffect hook |
| `imr` | import React |
| `imp` | import module |

### مثال استخدام:

```tsx
// اكتب: rafce ثم اضغط Tab

import React from 'react'

const ComponentName = () => {
  return (
    <div>ComponentName</div>
  )
}

export default ComponentName
```

---

## 🐛 الخطوة 9: Debugging

### إعداد Debugger

1. اذهب إلى **Run and Debug** (Ctrl+Shift+D)
2. انقر على **"create a launch.json file"**
3. اختر **"Chrome"** أو **"Edge"**

### ملف launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### استخدام Debugger

1. ضع breakpoint بالنقر على يسار رقم السطر
2. اضغط **F5** لبدء Debugging
3. استخدم أزرار التحكم (Continue, Step Over, Step Into, etc.)

---

## 📦 الخطوة 10: إدارة Git في VS Code

### Source Control Panel

افتح بـ **Ctrl+Shift+G**

### العمليات الأساسية

#### 1. Stage Changes
- انقر على **"+"** بجانب الملف

#### 2. Commit
- اكتب رسالة في الحقل العلوي
- انقر على **"✓"** أو اضغط **Ctrl+Enter**

#### 3. Push
- انقر على **"..."** → **"Push"**

#### 4. Pull
- انقر على **"..."** → **"Pull"**

### GitLens Features

- **File History**: انقر بزر الماوس الأيمن على ملف → **"Open File History"**
- **Line Blame**: معلومات Git لكل سطر
- **Compare**: مقارنة بين commits

---

## 🎯 الخطوة 11: نصائح للإنتاجية

### 1. Multi-Cursor Editing

```
Alt+Click: إضافة cursor جديد
Ctrl+Alt+↑/↓: إضافة cursor للأعلى/الأسفل
Ctrl+D: تحديد الكلمة التالية المطابقة
```

### 2. Split Editor

```
Ctrl+\: تقسيم المحرر عمودياً
Ctrl+K Ctrl+\: تقسيم المحرر أفقياً
```

### 3. Zen Mode

```
Ctrl+K Z: وضع التركيز الكامل (Zen Mode)
```

### 4. Emmet

```html
<!-- اكتب: div.container>ul>li*5 ثم Tab -->

<div class="container">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

---

## 🔍 الخطوة 12: البحث والاستبدال

### البحث في ملف واحد

```
Ctrl+F: بحث
Ctrl+H: بحث واستبدال
```

### البحث في جميع الملفات

```
Ctrl+Shift+F: بحث في المشروع
Ctrl+Shift+H: بحث واستبدال في المشروع
```

### Regex Search

فعّل **"Use Regular Expression"** (Alt+R)

```
مثال: ابحث عن جميع console.log
Pattern: console\.log\(.*\)
```

---

## 🎨 الخطوة 13: تخصيص Theme

### تثبيت Themes

1. اذهب إلى **Extensions**
2. ابحث عن themes مشهورة:
   - **One Dark Pro**
   - **Dracula Official**
   - **Night Owl**
   - **Material Theme**

### تطبيق Theme

```
Ctrl+K Ctrl+T: اختيار Theme
```

---

## 📊 الخطوة 14: مراقبة الأداء

### Task Manager

```
Ctrl+Shift+P → "Developer: Open Process Explorer"
```

يعرض استهلاك الذاكرة والمعالج لكل extension.

---

## ✅ Checklist النهائي

- [ ] تثبيت VS Code
- [ ] تثبيت جميع الإضافات الضرورية
- [ ] إعداد settings.json
- [ ] فتح المشروع في VS Code
- [ ] تثبيت التبعيات: `pnpm install`
- [ ] تشغيل المشروع: `pnpm dev`
- [ ] اختبار Hot Reload (عدّل ملف وشاهد التغيير فوراً)
- [ ] إعداد Git في Source Control
- [ ] تجربة Debugging
- [ ] تخصيص Theme والإعدادات

---

## 🆘 مشاكل شائعة وحلولها

### المشكلة: TypeScript errors كثيرة

**الحل**:
```bash
# أعد تشغيل TypeScript server
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### المشكلة: Tailwind IntelliSense لا يعمل

**الحل**:
```bash
# تأكد من وجود tailwind.config.js
# أعد تشغيل VS Code
```

### المشكلة: Git لا يظهر في Source Control

**الحل**:
```bash
# تأكد من تهيئة Git
git init
```

---

**🎉 الآن بيئة التطوير جاهزة بالكامل!**

يمكنك البدء في التطوير بكفاءة عالية.

---

**آخر تحديث**: نوفمبر 2025  
**الإصدار**: 1.0.0
