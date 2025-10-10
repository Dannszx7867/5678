import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

type PricingSectionProps = {
  onContinue: () => void;
};

export default function PricingSection({ onContinue }: PricingSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-lg overflow-hidden rounded-2xl shadow-2xl border-2 border-primary">
          <CardHeader className="bg-primary/10 p-6 text-center">
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">
              Oferta Exclusiva y Limitada
            </h3>
            <CardTitle className="font-headline text-3xl sm:text-4xl mt-2 text-foreground">
              Adquiere a tus modelos favoritas con un <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">plan único</span>, <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">vitalicio</span> y pagando solo la <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">tarifa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="mb-8">
              <span className="font-headline text-5xl sm:text-6xl font-bold text-primary">$5,90</span>
              <span className="ml-2 text-2xl font-medium text-muted-foreground line-through">$15</span>
              <p className="text-sm text-muted-foreground mt-1">Precio en dólar (USD). Al pagar, la plataforma convierte automaticamente a tu moeda local</p>
              <p className="mt-4 text-sm font-semibold text-primary/90 bg-primary/10 p-2 rounded-md">
                Tu contribución ayuda a mantener la plataforma y a recompensar a las creadoras de contenido por su trabajo.
              </p>
            </div>

            <div className="text-left space-y-4 my-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-foreground">
                  <span className="font-bold">Acceso VIP a TODO el contenido</span> de las modelos que más te gustaron (¡y de todas las demás también!).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 flex-shrink-0 mt-1">
                  <Star className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-foreground">
                  Participa en un <span className="font-bold">sorteo exclusivo para una visita a domicilio</span> con una de las modelos del Top 3. ¡Una experiencia inolvidable!
                </p>
              </div>
               <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-foreground">
                  <span className="font-bold">Posibilidad de comunicarte con las modelos vía WhatsApp para conversaciones privadas</span>
                </p>
              </div>
            </div>

            <Button
              onClick={onContinue}
              size="lg"
              className="w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90 px-10 py-8 shadow-lg shadow-primary/30 active:scale-95"
            >
              QUIERO MI ACCESO VIP AHORA
            </Button>
             <p className="mt-4 text-xs text-muted-foreground">
              Esta oferta puede terminar en cualquier momento sin previo aviso.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
