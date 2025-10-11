'use client';

import type { Model } from '@/app/data/models';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Lock } from 'lucide-react';
import Image from 'next/image';

type ExclusiveOfferSectionProps = {
  model: Model;
  onContinue: () => void;
};

export default function ExclusiveOfferSection({ model, onContinue }: ExclusiveOfferSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="font-headline text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Oferta Exclusiva y Limitada
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Continúa el chat con <span className="font-bold text-primary">{model.name}</span> pagando solo la tarifa
          </p>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground shadow-lg overflow-hidden">
          <div className="relative aspect-video w-full">
            {model.videoUrl ? (
               <video
                key={model.videoUrl}
                src={model.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover block"
               />
            ) : (
                <Image
                    src={model.imageUrl}
                    alt={model.name}
                    fill
                    className="object-cover"
                />
            )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="p-6">
             <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <span className="text-4xl sm:text-5xl font-bold text-primary">€9,00</span>
                    <span className="ml-2 text-xl text-muted-foreground line-through">€27,90</span>
                </div>
                <p className="text-sm text-muted-foreground text-center sm:text-right">
                    Precio en Euro (EUR).<br/>La plataforma convierte a tu moneda local.
                </p>
            </div>
            
            <ul className="space-y-3 text-left mb-8">
                <li className="flex items-start gap-3">
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Acceso Exclusivo a TODO el contenido de <span className="font-semibold">{model.name}</span> (y de todas las demás también!).</span>
                </li>
                 <li className="flex items-start gap-3">
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Posibilidad de comunicarte con las modelos vía WhatsApp para conversaciones privadas.</span>
                </li>
                <li className="flex items-start gap-3">
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Participa en un sorteo exclusivo para un viaje en yate con varias modelos. ¡Una experiencia inolvidable!</span>
                </li>
            </ul>

            <Button
                onClick={onContinue}
                size="lg"
                className="w-full rounded-full bg-primary text-xl font-bold text-primary-foreground hover:bg-primary/90 px-10 py-8 shadow-lg shadow-primary/30 active:scale-95"
            >
                <Lock className="mr-3" />
                DESBLOQUEAR TODO AHORA
            </Button>
             <p className="mt-4 text-xs text-destructive font-semibold text-center animate-pulse">
                Esta oferta puede terminar en cualquier momento sin previo aviso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
