import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 
  | "intro"
  | "q1" | "q2" | "q3" | "q4"
  | "intensity1" | "intensity2"
  | "open1" | "open2"
  | "email-form"
  | "thank-you"
  | "decline";

interface QuizData {
  describes: string;
  concern: string;
  duration: string;
  doctorVisit: string;
  peaceOfMind: number;
  urgency: number;
  biggestChallenge: string;
  dreamOutcome: string;
  wantsNotification: boolean;
  name: string;
  email: string;
  // timings in seconds per step
  timings?: Record<string, number>;
  startedAt?: string;
  finishedAt?: string;
  dropoffStep?: string;
}

const ProstatePahQuiz = ({ isOpen, onClose }: QuizProps) => {
  const [step, setStep] = useState<Step>("intro");
  const [data, setData] = useState<QuizData>({
    describes: "",
    concern: "",
    duration: "",
    doctorVisit: "",
    peaceOfMind: 3,
    urgency: 3,
    biggestChallenge: "",
    dreamOutcome: "",
    wantsNotification: false,
    name: "",
    email: "",
    timings: {},
  });

  // timing helpers
  const [lastStepStart, setLastStepStart] = useState<number>(Date.now());
  const [lastStepId, setLastStepId] = useState<Step>("intro");

  const totalSteps = 9;
  const stepOrder: Step[] = ["q1", "q2", "q3", "q4", "intensity1", "intensity2", "open1", "open2", "email-form"];
  
  const getCurrentStepNumber = () => {
    const idx = stepOrder.indexOf(step);
    return idx >= 0 ? idx + 1 : 0;
  };

  // When the modal opens, initialize timing
  useEffect(() => {
    if (isOpen) {
      const now = Date.now();
      setLastStepStart(now);
      setLastStepId(step);
      setData((d) => ({ ...d, startedAt: new Date(now).toISOString() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Track time spent on each step whenever `step` changes
  useEffect(() => {
    if (!isOpen) return;
    const now = Date.now();
    const durationSec = Math.max(0, Math.round((now - lastStepStart) / 1000));
    // update timing for previous step id
    setData((d) => ({
      ...d,
      timings: {
        ...(d.timings || {}),
        [lastStepId]: (d.timings?.[lastStepId] || 0) + durationSec,
      },
    }));
    setLastStepStart(now);
    setLastStepId(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const goNext = () => {
    const steps: Step[] = ["intro", "q1", "q2", "q3", "q4", "intensity1", "intensity2", "open1", "open2", "email-form"];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1]);
    }
  };

  const goBack = () => {
    const steps: Step[] = ["intro", "q1", "q2", "q3", "q4", "intensity1", "intensity2", "open1", "open2", "email-form"];
    const idx = steps.indexOf(step);
    if (idx > 0) {
      setStep(steps[idx - 1]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Finalize timing info
      const finishedAt = new Date().toISOString();
      setData((d) => ({ ...d, finishedAt }));

      // Send quiz data to backend API. Uses `VITE_API_URL` if provided.
      const apiBase = (import.meta as any).env?.VITE_API_URL ?? "";
      const url = apiBase ? `${apiBase.replace(/\/$/, "")}/api/quiz` : "/api/quiz";
      // Build payload from latest state and finishedAt we just computed
      const payload = { ...data, finishedAt } as any;

      // DEBUG: log URL and payload so we can inspect from browser
      try {
        // eslint-disable-next-line no-console
        console.log("[quiz] submit url:", url);
        // eslint-disable-next-line no-console
        console.log("[quiz] payload:", payload);
      } catch (e) {
        // ignore logging errors
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error("[quiz] submit failed", res.status, text);
      } else {
        console.log("[quiz] submit succeed", res.status, text);
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
      // proceed to thank-you to avoid blocking user's flow
    }

    setStep("thank-you");
  };

  const resetAndClose = () => {
    // If user closes before finishing, record dropoff and submit partial data
    const isFinished = step === "thank-you" || step === "decline";
    if (!isFinished) {
      const payload = {
        ...data,
        dropoffStep: step,
        finishedAt: new Date().toISOString(),
        partial: true,
      } as any;

      (async () => {
        try {
          const apiBase = (import.meta as any).env?.VITE_API_URL ?? "";
          const url = apiBase ? `${apiBase.replace(/\/$/, "")}/api/quiz` : "/api/quiz";
          // fire-and-forget; server will fallback to local log if necessary
          const r = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const txt = await r.text().catch(() => "");
          console.log("[quiz] partial submit", r.status, txt);
        } catch (e) {
          console.error("[quiz] partial submit error:", e);
        }
      })();
    }

    // reset UI state
    setStep("intro");
    setData({
      describes: "",
      concern: "",
      duration: "",
      doctorVisit: "",
      peaceOfMind: 3,
      urgency: 3,
      biggestChallenge: "",
      dreamOutcome: "",
      wantsNotification: false,
      name: "",
      email: "",
      timings: {},
    });
    onClose();
  };

  const renderProgressBar = () => {
    const currentNum = getCurrentStepNumber();
    if (currentNum === 0) return null;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentNum} of {totalSteps}</span>
          <span>{Math.round((currentNum / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${(currentNum / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  const renderIntro = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-accent" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Find Your Prostate Health Path</h2>
      <p className="text-muted-foreground">
        Answer a few quick questions so we can personalize your guidance and give you the clearest next steps for your situation.
      </p>
      <p className="text-sm text-muted-foreground">Takes about 2 minutes</p>
      <Button variant="cta" size="lg" onClick={goNext} className="w-full">
        Let's Get Started <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );

  const renderQ1 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">Which best describes you?</h3>
      <RadioGroup value={data.describes} onValueChange={(v) => setData({ ...data, describes: v })}>
        {[
          { value: "proactive", label: "I'm being proactive about my health" },
          { value: "symptoms", label: "I've noticed some symptoms that concern me" },
          { value: "diagnosed", label: "I've recently been diagnosed with a prostate condition" },
          { value: "treatment", label: "I'm currently deciding on treatment options" },
          { value: "monitoring", label: "I'm monitoring an existing condition" },
        ].map((opt) => (
          <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value={opt.value} id={opt.value} />
            <Label htmlFor={opt.value} className="flex-1 cursor-pointer">{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} disabled={!data.describes} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderQ2 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">What brought you here today?</h3>
      <RadioGroup value={data.concern} onValueChange={(v) => setData({ ...data, concern: v })}>
        {[
          { value: "urinary", label: "Urinary symptoms (frequency, weak flow, urgency)" },
          { value: "psa", label: "PSA test results I don't understand" },
          { value: "screening", label: "Wanting to know if I should get screened" },
          { value: "diagnosis", label: "Understanding a recent diagnosis" },
          { value: "treatment", label: "Comparing treatment options" },
          { value: "general", label: "General prostate health concerns" },
        ].map((opt) => (
          <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value={opt.value} id={`q2-${opt.value}`} />
            <Label htmlFor={`q2-${opt.value}`} className="flex-1 cursor-pointer">{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} disabled={!data.concern} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderQ3 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">How long have you been dealing with this concern?</h3>
      <RadioGroup value={data.duration} onValueChange={(v) => setData({ ...data, duration: v })}>
        {[
          { value: "new", label: "Just started noticing recently" },
          { value: "months", label: "A few months" },
          { value: "year", label: "About a year" },
          { value: "years", label: "Several years" },
          { value: "unsure", label: "I'm not sure / being proactive" },
        ].map((opt) => (
          <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value={opt.value} id={`q3-${opt.value}`} />
            <Label htmlFor={`q3-${opt.value}`} className="flex-1 cursor-pointer">{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} disabled={!data.duration} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderQ4 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">Have you spoken with a doctor about this?</h3>
      <RadioGroup value={data.doctorVisit} onValueChange={(v) => setData({ ...data, doctorVisit: v })}>
        {[
          { value: "no", label: "Not yet – I'm not sure if I should" },
          { value: "scheduled", label: "I have an appointment scheduled" },
          { value: "once", label: "Yes, once, but I left with more questions" },
          { value: "multiple", label: "Yes, multiple times" },
          { value: "specialist", label: "I'm already seeing a specialist" },
        ].map((opt) => (
          <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value={opt.value} id={`q4-${opt.value}`} />
            <Label htmlFor={`q4-${opt.value}`} className="flex-1 cursor-pointer">{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} disabled={!data.doctorVisit} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderIntensity1 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">How much does this affect your daily peace of mind?</h3>
      <p className="text-sm text-muted-foreground">We ask this to understand how we can best help you.</p>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>Not at all</span>
          <span>Significantly</span>
        </div>
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setData({ ...data, peaceOfMind: num })}
              className={`flex-1 h-12 rounded-lg border-2 font-semibold transition-all ${
                data.peaceOfMind === num
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent/50"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderIntensity2 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">How urgently do you want clarity on your next steps?</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>No rush</span>
          <span>Very urgent</span>
        </div>
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setData({ ...data, urgency: num })}
              className={`flex-1 h-12 rounded-lg border-2 font-semibold transition-all ${
                data.urgency === num
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent/50"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderOpen1 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">What's your biggest challenge right now when it comes to your prostate health?</h3>
      <p className="text-sm text-muted-foreground">
        Feel free to share as much as you'd like. This helps us understand what you're really going through.
      </p>
      <Textarea
        value={data.biggestChallenge}
        onChange={(e) => setData({ ...data, biggestChallenge: e.target.value })}
        placeholder="For example: I don't know if my symptoms are serious, I'm confused about my test results, I'm scared to talk to a doctor..."
        className="min-h-[120px] resize-none"
      />
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderOpen2 = () => (
    <div className="space-y-6">
      {renderProgressBar()}
      <h3 className="text-xl font-semibold text-foreground">What would it mean to you to have complete clarity and confidence about your prostate health?</h3>
      <p className="text-sm text-muted-foreground">
        Describe your ideal outcome – what does "peace of mind" look like for you?
      </p>
      <Textarea
        value={data.dreamOutcome}
        onChange={(e) => setData({ ...data, dreamOutcome: e.target.value })}
        placeholder="For example: Knowing exactly what questions to ask my doctor, understanding my options clearly, feeling confident in my decisions..."
        className="min-h-[120px] resize-none"
      />
      <div className="flex gap-3">
        <Button variant="outline" onClick={goBack} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button variant="cta" onClick={goNext} className="flex-1">
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderEmailPrompt = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-accent" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">You're almost there!</h3>
      <p className="text-muted-foreground">
        Based on everything you've shared, we can create personalized guidance just for you. Would you like to receive your customized prostate health roadmap?
      </p>
      <div className="space-y-3">
        <Button 
          variant="cta" 
          size="lg" 
          className="w-full"
          onClick={() => setStep("email-form")}
        >
          Yes, send me my personalized guidance
        </Button>
        <Button 
          variant="ghost" 
          className="w-full text-muted-foreground"
          onClick={() => setStep("decline")}
        >
          No thanks, not right now
        </Button>
      </div>
    </div>
  );

  const renderEmailForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground text-center">Where should we send your personalized guidance?</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        We respect your privacy. Your information is secure and we'll never spam you.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep("open2")} className="flex-1">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button 
          variant="cta" 
          onClick={handleSubmit} 
          disabled={!data.name || !data.email}
          className="flex-1"
        >
          Get My Guidance <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderThankYou = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-2xl font-bold text-foreground">You're all set, {data.name}!</h3>
      <p className="text-muted-foreground">
        We're preparing your personalized prostate health guidance. Check your inbox at <strong>{data.email}</strong> for next steps.
      </p>
      <p className="text-sm text-muted-foreground">
        In the meantime, feel free to explore our resources and learn more about taking control of your prostate health journey.
      </p>
      <Button variant="cta" onClick={resetAndClose} className="w-full">
        Back to Homepage
      </Button>
    </div>
  );

  const renderDecline = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
        <X className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No problem at all</h3>
      <p className="text-muted-foreground">
        Thank you for taking the time to share your thoughts with us. We appreciate your openness.
      </p>
      <p className="text-sm text-muted-foreground">
        If you ever change your mind, we'll be here to help you navigate your prostate health journey with confidence.
      </p>
      <Button variant="outline" onClick={resetAndClose} className="w-full">
        Back to Homepage
      </Button>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case "intro": return renderIntro();
      case "q1": return renderQ1();
      case "q2": return renderQ2();
      case "q3": return renderQ3();
      case "q4": return renderQ4();
      case "intensity1": return renderIntensity1();
      case "intensity2": return renderIntensity2();
      case "open1": return renderOpen1();
      case "open2": return renderOpen2();
      case "email-form": return renderEmailForm();
      case "thank-you": return renderThankYou();
      case "decline": return renderDecline();
      default: return renderIntro();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default ProstatePahQuiz;
