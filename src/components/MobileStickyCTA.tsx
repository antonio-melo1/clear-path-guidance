import { Button } from "@/components/ui/button";

interface MobileStickyCTAProps {
  onOpenModal: () => void;
}

export function MobileStickyCTA({ onOpenModal }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
      <Button 
        variant="cta" 
        className="w-full" 
        size="lg"
        onClick={onOpenModal}
      >
        Get Started Free
      </Button>
    </div>
  );
}
