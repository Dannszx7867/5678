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
              Continúa el <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">chat</span> con tu modelo <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">favorita</span> pagando solo la <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">tarifa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="mb-8">
              <span className="font-headline text-5xl sm:text-6xl font-bold text-primary">€9,00</span>
              <span className="ml-2 text-2xl font-medium text-muted-foreground line-through">€27,90</span>
              <p className="text-sm text-muted-foreground mt-1">Precio en euro (EUR). Al pagar, la plataforma convierte automáticamente a tu moneda local.</p>
            </div>

            <div className="text-left space-y-4 my-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-foreground">
                  <span className="font-bold">Acceso Exclusivo a TODO el contenido</span> de las modelos que más te gustaron (¡y de todas las demás también!).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 flex-shrink-0 mt-1">
                  <Star className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-foreground">
                  Participa en un <span className="font-bold">sorteo exclusivo para un viaje en yate con varias modelos de OnlyFans</span>. ¡Una experiencia inolvidable!
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
              DESBLOQUEAR TODO AHORA
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
