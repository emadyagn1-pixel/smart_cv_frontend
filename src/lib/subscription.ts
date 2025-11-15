// Subscription system for Free vs Premium tiers

export type SubscriptionTier = "free" | "premium";

export interface SubscriptionLimits {
  monthlyAnalyses: number; // -1 means unlimited
  jobSources: string[];
}

export const SUBSCRIPTION_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  free: {
    monthlyAnalyses: 3,
    jobSources: ["Agentur für Arbeit"],
  },
  premium: {
    monthlyAnalyses: -1, // Unlimited
    jobSources: ["Agentur für Arbeit", "LinkedIn", "Indeed", "StepStone", "XING"],
  },
};

export interface UsageData {
  tier: SubscriptionTier;
  analysesUsed: number;
  lastResetDate: string; // ISO date string
}

const STORAGE_KEY = "cv_analyzer_usage";

export function getUsageData(): UsageData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      tier: "free",
      analysesUsed: 0,
      lastResetDate: new Date().toISOString(),
    };
  }
  
  const data: UsageData = JSON.parse(stored);
  
  // Reset counter if it's a new month
  const lastReset = new Date(data.lastResetDate);
  const now = new Date();
  if (
    lastReset.getMonth() !== now.getMonth() ||
    lastReset.getFullYear() !== now.getFullYear()
  ) {
    data.analysesUsed = 0;
    data.lastResetDate = now.toISOString();
    saveUsageData(data);
  }
  
  return data;
}

export function saveUsageData(data: UsageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function incrementUsage(): void {
  const data = getUsageData();
  data.analysesUsed += 1;
  saveUsageData(data);
}

export function canAnalyze(): boolean {
  const data = getUsageData();
  const limits = SUBSCRIPTION_LIMITS[data.tier];
  
  if (limits.monthlyAnalyses === -1) {
    return true; // Unlimited
  }
  
  return data.analysesUsed < limits.monthlyAnalyses;
}

export function getRemainingAnalyses(): number {
  const data = getUsageData();
  const limits = SUBSCRIPTION_LIMITS[data.tier];
  
  if (limits.monthlyAnalyses === -1) {
    return -1; // Unlimited
  }
  
  return Math.max(0, limits.monthlyAnalyses - data.analysesUsed);
}

export function upgradeToPremium(): void {
  const data = getUsageData();
  data.tier = "premium";
  saveUsageData(data);
}
