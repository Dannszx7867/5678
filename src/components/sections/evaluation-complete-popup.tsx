import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

type EvaluationCompletePopupProps = {
  isOpen: boolean;
  onAction: () => void;
};

export default function EvaluationCompletePopup({ isOpen, onAction }: EvaluationCompletePopupProps) {
  
  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[95vw] max-w-lg overflow-hidden rounded-2xl shadow-2xl animate-fade-in border-2 border-primary bg-background p-0">
        <DialogHeader className="text-center bg-primary/10 p-6">
          <DialogTitle className="font-headline text-2xl sm:text-3xl font-bold text-primary">
            🎊 ¡Felicidades!
          </DialogTitle>
          <DialogDescription className="text-foreground/90 text-base sm:text-lg mt-4">
            Has evaluado a TODAS. Y como recompensa… tu pase VIP está liberado para hablar directamente con las TOP 3 modelos más deseadas de OnlyFans. 💬🔥
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4 flex flex-col items-center">
            <ArrowDown className="h-10 w-10 animate-bounce text-primary mb-2" />
            <Button
                onClick={onAction}
                size="lg"
                className="w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90 px-10 py-7 shadow-lg shadow-primary/30 active:scale-95"
            >
                Ver las 3 mejores
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
