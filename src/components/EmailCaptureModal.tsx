import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailCaptureModal({ open, onOpenChange }: EmailCaptureModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ageRange: "",
    concern: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.ageRange || !formData.concern) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to get your personalized assessment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
    
    toast({
      title: "You're in!",
      description: "Check your email for your personalized assessment link.",
    });

    setTimeout(() => {
      onOpenChange(false);
      setIsSuccess(false);
      setFormData({ name: "", email: "", ageRange: "", concern: "" });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">You're In!</h3>
            <p className="text-muted-foreground">
              Check your email for your personalized assessment link.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Start Your Free Assessment
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Get personalized guidance in just 3 minutes. No credit card required.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground">Age Range</Label>
                <Select
                  value={formData.ageRange}
                  onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="under-40">Under 40</SelectItem>
                    <SelectItem value="40-50">40-50</SelectItem>
                    <SelectItem value="50-60">50-60</SelectItem>
                    <SelectItem value="60+">60+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="concern" className="text-foreground">Primary Concern</Label>
                <Select
                  value={formData.concern}
                  onValueChange={(value) => setFormData({ ...formData, concern: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="What brings you here?" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                    <SelectItem value="early-symptoms">Early symptoms</SelectItem>
                    <SelectItem value="recently-diagnosed">Recently diagnosed</SelectItem>
                    <SelectItem value="treatment-decision">Treatment decision</SelectItem>
                    <SelectItem value="post-treatment">Post-treatment monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                variant="cta" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Get My Free Assessment"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
