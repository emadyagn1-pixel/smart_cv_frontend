import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Zap } from "lucide-react";
import { getRemainingAnalyses, getUsageData, SUBSCRIPTION_LIMITS } from "@/lib/subscription";

interface SubscriptionBannerProps {
  onUpgrade: () => void;
}

export default function SubscriptionBanner({ onUpgrade }: SubscriptionBannerProps) {
  const data = getUsageData();
  const remaining = getRemainingAnalyses();
  const isPremium = data.tier === "premium";

  if (isPremium) {
    return (
      <Card className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-amber-600" />
            <div>
              <h3 className="font-semibold text-amber-900">Premium Member</h3>
              <p className="text-sm text-amber-700">Unlimited CV analyses & job search from all sources</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-600">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Unlimited</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">Free Plan</h3>
          <p className="text-sm text-slate-600">
            {remaining === 0 ? (
              <span className="text-red-600 font-medium">No analyses remaining this month</span>
            ) : (
              <>
                <span className="font-semibold text-blue-600">{remaining}</span> of{" "}
                {SUBSCRIPTION_LIMITS.free.monthlyAnalyses} analyses remaining this month
              </>
            )}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Job search: {SUBSCRIPTION_LIMITS.free.jobSources.join(", ")}
          </p>
        </div>
        <Button 
          onClick={onUpgrade}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
        >
          <Crown className="w-4 h-4 mr-2" />
          Upgrade to Premium
        </Button>
      </div>
    </Card>
  );
}
