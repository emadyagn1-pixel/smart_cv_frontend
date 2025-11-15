import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DateInput({ value, onChange, placeholder = "MM/YYYY" }: DateInputProps) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Parse initial value
  useEffect(() => {
    if (value && value.includes("/")) {
      const [m, y] = value.split("/");
      setMonth(m);
      setYear(y);
    }
  }, [value]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Only digits
    if (val.length <= 2) {
      const numVal = parseInt(val);
      if (val === "" || (numVal >= 1 && numVal <= 12)) {
        setMonth(val);
        if (val.length === 2 && year.length === 4) {
          onChange(`${val}/${year}`);
        }
      }
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Only digits
    if (val.length <= 4) {
      setYear(val);
      if (month.length === 2 && val.length === 4) {
        onChange(`${month}/${val}`);
      }
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Input
        type="text"
        inputMode="numeric"
        placeholder="MM"
        value={month}
        onChange={handleMonthChange}
        className="w-16 text-center"
        maxLength={2}
      />
      <span className="text-slate-500">/</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="YYYY"
        value={year}
        onChange={handleYearChange}
        className="w-20 text-center"
        maxLength={4}
      />
    </div>
  );
}
