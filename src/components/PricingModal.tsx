import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Crown } from "lucide-react";
import { upgradeToPremium } from "@/lib/subscription";
import { toast } from "sonner";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PricingModal({ open, onClose }: PricingModalProps) {
  const handleUpgrade = () => {
    upgradeToPremium();
    toast.success("Upgraded to Premium! Enjoy unlimited CV analyses.");
    onClose();
    window.location.reload(); // Refresh to update UI
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Plan</DialogTitle>
          <DialogDescription>
            Unlock unlimited CV analyses and job search from multiple sources
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Free Plan */}
          <div className="border rounded-lg p-6 bg-slate-50">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Free</h3>
            <div className="text-3xl font-bold text-slate-900 mb-4">
              €0<span className="text-lg font-normal text-slate-600">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">3 CV analyses per month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">ATS-optimized CV rewriting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">Job search from Agentur für Arbeit</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">6 professional CV templates</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-amber-500 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-yellow-50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              BEST VALUE
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-600" />
              Premium
            </h3>
            <div className="text-3xl font-bold text-slate-900 mb-4">
              €9.99<span className="text-lg font-normal text-slate-600">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 font-semibold">Unlimited CV analyses</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">ATS-optimized CV rewriting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 font-semibold">
                  Job search from all sources (LinkedIn, Indeed, StepStone, XING, Agentur für Arbeit)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">6 professional CV templates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 font-semibold">Priority support</span>
              </li>
            </ul>
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          * This is a demo. No actual payment is required. Clicking "Upgrade Now" will activate Premium features.
        </p>
      </DialogContent>
    </Dialog>
  );
}
