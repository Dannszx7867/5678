import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, Flame } from "lucide-react";
import Link from 'next/link';
import type { PersonalizedBeautyScoreOutput } from '@/ai/flows/personalized-beauty-score';
import Image from "next/image";

type ResultSectionProps = {
  result: PersonalizedBeautyScoreOutput | null;
  isLoading: boolean;
};

export default function ResultSection({ result, isLoading }: ResultSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in">
          <Card className="mx-auto max-w-lg text-center rounded-2xl shadow-2xl">
            <CardHeader className="p-6">
              <CardTitle className="font-headline text-3xl">
                {isLoading ? "Calculando tu resultado..." : "¡Tu Puntuación de Belleza ha sido calculada! 🔥"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <p className="text-muted-foreground">Analizando tus preferencias...</p>
                </div>
              ) : (
                result && (
                  <>
                    <p className="text-7xl font-bold text-primary">{result.beautyScore}</p>
                    <p className="text-lg text-muted-foreground mt-2">Tu Puntuación de Belleza</p>
                    
                    <p className="text-base text-foreground mt-6">
                      {result.suggestedContent}
                    </p>

                    <p className="mt-6 text-base text-foreground/90">
                      ¡Felicitaciones! Has sido seleccionado para desbloquear contenidos privados y acceso directo al WhatsApp de las modelos. Algunas incluso aceptan encuentros presenciales 🔥
                    </p>

                    <p className="mt-4 text-sm font-bold text-destructive">¡Disponible por tiempo limitado!</p>
                    
                    <Link href="/unlocked" passHref>
                      <Button
                        size="lg"
                        className="mt-8 w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90 px-10 py-8 shadow-lg shadow-primary/30 active:scale-95"
                      >
                        Desbloquear Contenido de la Modelo
                        <Lock className="ml-2 h-5 w-5" />
                        <Flame className="ml-1 h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
