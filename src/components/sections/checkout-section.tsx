import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, ShieldCheck, Clock, ArrowDown, Star, Mail, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

type CheckoutSectionProps = {
  onContinue: () => void;
  onPlanChange: (isPremium: boolean) => void;
};

export default function CheckoutSection({ onContinue, onPlanChange }: CheckoutSectionProps) {
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('standard');
  const router = useRouter();

  const handlePlanChange = (isPremiumChecked: boolean) => {
    const newPlan = isPremiumChecked ? 'premium' : 'standard';
    setSelectedPlan(newPlan);
    onPlanChange(newPlan === 'premium');
  };

  useEffect(() => {
    onPlanChange(selectedPlan === 'premium');
  }, [selectedPlan, onPlanChange]);


  const ctaPrice = selectedPlan === 'premium' ? '14,00' : '9,00';
  const isPremium = selectedPlan === 'premium';
  
  const handleCheckout = () => {
    onContinue();
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Continúa el chat con tu modelo favorita pagando solo la tarifa
            </h2>
        </div>

        <Card className="mb-8 rounded-2xl bg-primary/5 border border-primary/20">
          <CardContent className="p-6 grid sm:grid-cols-1 gap-6">
             <div className="flex items-start gap-4">
              <Mail className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-foreground">Acceso Inmediato por E-mail</h4>
                <p className="text-sm text-muted-foreground">Después de la confirmación del pago, recibirás un e-mail con tu acceso exclusivo en hasta 10 minutos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-foreground">Soporte 24/7</h4>
                <p className="text-sm text-muted-foreground">Nuestro equipo de soporte está disponible a cualquier hora del día para ayudarte con lo que necesites.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
                <ShieldAlert className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-foreground">Checkout Seguro con MUNDPAY</h4>
                    <p className="text-sm text-muted-foreground">El pago se realizará a través del checkout oficial de la plataforma de pagos MUNDPAY, lo que nos permite garantizar seguridad y privacidad en todo momento.</p>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 flex items-center justify-center space-x-3 mb-8">
            <Checkbox id="terms" onCheckedChange={(checked) => setTermsAccepted(!!checked)} checked={termsAccepted} className="w-5 h-5"/>
            <Label htmlFor="terms" className="text-base text-foreground/90 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              He leído y acepto los <a href="#" className="underline hover:text-primary">términos y políticas</a> de la plataforma.
            </Label>
        </div>


        <Card className={`mb-8 rounded-2xl border-2 bg-primary/5 transition-all duration-300 ${isPremium ? 'border-primary shadow-lg shadow-primary/20' : 'border-dashed border-primary'}`}>
            <CardHeader>
                <CardTitle className="font-headline text-lg text-center text-primary flex items-center justify-center gap-2">
                    <Star className="h-5 w-5"/> UPGRADE DISPONIBLE 
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 pt-0">
                <div className="flex-1">
                    <h4 className="font-bold text-lg text-foreground">Acceso TOTAL a TODAS las 9 Modelos + 5 Modelos secretas + Sorteos VIP</h4>
                    <p className="text-muted-foreground text-sm mt-1">Libera el contenido de todas las modelos de la plataforma, no solo las de tu Top 3, y compite por premios exclusivos semanales.</p>
                </div>
                <div className="flex items-center gap-4 p-2 cursor-pointer" onClick={() => handlePlanChange(!isPremium)}>
                     <span className="font-headline text-3xl font-bold text-primary">€14,00</span>
                    <div className="flex items-center space-x-2">
                        <Switch id="premium-plan" checked={isPremium} onCheckedChange={handlePlanChange} aria-label="Cambiar a plan premium"/>
                        <Label htmlFor="premium-plan" className="font-bold flex items-center gap-1 cursor-pointer">
                            <span>Activar</span>
                        </Label>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <Button
          size="lg"
          className="w-full rounded-full bg-primary text-xl font-bold text-primary-foreground hover:bg-primary/90 px-10 py-8 shadow-lg shadow-primary/30 active:scale-95 disabled:bg-gray-400 disabled:shadow-none disabled:animate-none"
          disabled={!termsAccepted}
          onClick={handleCheckout}
        >
          Pagar €{ctaPrice}
        </Button>

        <p className="mt-4 text-xs text-muted-foreground text-center">
            Haz clic en el botón de arriba para proceder con el pago seguro. Recibirás el acceso por e-mail inmediatamente después de la confirmación.
        </p>
      </div>
    </section>
  );
}
