import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type WelcomePopupProps = {
  onAction: () => void;
};

export default function WelcomePopup({ onAction }: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Don't show popup if it was already closed
      const wasClosed = sessionStorage.getItem('welcome-popup-closed');
      if (!wasClosed) {
        setIsOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('welcome-popup-closed', 'true');
    setIsOpen(false);
  };
  
  const handleAction = () => {
    handleClose();
    onAction();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-[95vw] max-w-lg p-6 sm:p-8 overflow-hidden rounded-2xl shadow-2xl animate-fade-in">
        <DialogHeader className="text-center">
          <DialogTitle className="font-headline text-2xl sm:text-3xl font-bold text-primary">
            🎉 ¡Felicitaciones! Has ganado acceso exclusivo 🔥
          </DialogTitle>
          <DialogDescription className="text-foreground/90 text-base sm:text-lg mt-4">
            Pero solo se liberará después de que completes la evaluación. Termina ahora y descúbrelo todo 👇
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 sm:pt-6">
            <Button
                onClick={handleAction}
                size="lg"
                className="w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90 px-10 py-7 shadow-lg shadow-primary/30 active:scale-95"
            >
                Liberar mi acceso
            </Button>
            <p className="mt-4 text-xs text-muted-foreground text-center">
            Oferta limitada. Este acceso puede expirar en cualquier momento.
            </p>
        </div>
        <button onClick={handleClose} className="absolute top-3 right-3 p-1 rounded-full bg-background/50 text-foreground/70 hover:bg-background hover:text-foreground z-10 transition-colors" aria-label="Cerrar">
          <X size={20} />
          <span className="sr-only">Cerrar</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
