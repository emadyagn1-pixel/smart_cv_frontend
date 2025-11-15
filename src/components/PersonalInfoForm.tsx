import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfo } from "@/types/manualForm";
import { User, MapPin, Mail, Phone, Calendar, Globe } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  language: "en" | "de" | "ar";
}

const labels = {
  en: {
    title: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    birthDate: "Birth Date",
    birthPlace: "Birth Place",
    address: "Address",
    postalCode: "Postal Code (PLZ)",
    postalCodeHint: "For finding jobs near you",
    city: "City",
    country: "Country",
    phone: "Phone",
    email: "Email",
    placeholders: {
      firstName: "e.g., Erika",
      lastName: "e.g., Musterfrau",
      birthPlace: "e.g., Hamburg",
      address: "e.g., Musterstr. 111",
      postalCode: "e.g., 12345",
      city: "e.g., Hamburg",
      country: "e.g., Germany",
      phone: "e.g., +49 123 4567890",
      email: "e.g., erika@musterfrau.de",
    },
  },
  de: {
    title: "Persönliche Infos",
    firstName: "Vorname",
    lastName: "Nachname",
    birthDate: "Geburtsdatum",
    birthPlace: "Geburtsort",
    address: "Adresse",
    postalCode: "PLZ",
    postalCodeHint: "Für Jobsuche in Ihrer Nähe",
    city: "Stadt",
    country: "Land",
    phone: "Telefon",
    email: "E-Mail",
    placeholders: {
      firstName: "z.B. Erika",
      lastName: "z.B. Musterfrau",
      birthPlace: "z.B. Hamburg",
      address: "z.B. Musterstr. 111",
      postalCode: "z.B. 12345",
      city: "z.B. Hamburg",
      country: "z.B. Deutschland",
      phone: "z.B. +49 123 4567890",
      email: "z.B. erika@musterfrau.de",
    },
  },
  ar: {
    title: "المعلومات الشخصية",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    birthDate: "تاريخ الميلاد",
    birthPlace: "مكان الميلاد",
    address: "العنوان",
    postalCode: "الرمز البريدي",
    postalCodeHint: "لإيجاد وظائف قريبة منك",
    city: "المدينة",
    country: "الدولة",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    placeholders: {
      firstName: "مثال: أحمد",
      lastName: "مثال: حسن",
      birthPlace: "مثال: القاهرة",
      address: "مثال: شارع النصر 111",
      postalCode: "مثال: 12345",
      city: "مثال: القاهرة",
      country: "مثال: مصر",
      phone: "مثال: +20 123 4567890",
      email: "مثال: ahmed@example.com",
    },
  },
};

export default function PersonalInfoForm({ data, onChange, language }: PersonalInfoFormProps) {
  const t = labels[language];

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <User className="w-5 h-5" />
        {t.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t.firstName}</Label>
          <Input
            id="firstName"
            placeholder={t.placeholders.firstName}
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">{t.lastName}</Label>
          <Input
            id="lastName"
            placeholder={t.placeholders.lastName}
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t.birthDate}
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            lang="en-US"
            style={{ direction: 'ltr' }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthPlace">{t.birthPlace}</Label>
          <Input
            id="birthPlace"
            placeholder={t.placeholders.birthPlace}
            value={data.birthPlace}
            onChange={(e) => handleChange("birthPlace", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t.address}
          </Label>
          <Input
            id="address"
            placeholder={t.placeholders.address}
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">
            {t.postalCode}
            <span className="text-xs text-slate-500 block">{t.postalCodeHint}</span>
          </Label>
          <Input
            id="postalCode"
            placeholder={t.placeholders.postalCode}
            value={data.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            maxLength={10}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">{t.city}</Label>
          <Input
            id="city"
            placeholder={t.placeholders.city}
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {t.country}
          </Label>
          <Input
            id="country"
            placeholder={t.placeholders.country}
            value={data.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {t.phone}
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t.placeholders.phone}
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {t.email}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t.placeholders.email}
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
