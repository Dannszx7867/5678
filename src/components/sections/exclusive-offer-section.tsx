'use client';

import type { Model } from '@/app/data/models';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Lock, ArrowDown } from 'lucide-react';
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
            Continúa el&nbsp;
            <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">
              chat
            </span>
            &nbsp;con&nbsp;
            <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">
              {model.name}
            </span>
            &nbsp;pagando solo la&nbsp;
            <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">
              tarifa
            </span>
            &nbsp;de la plataforma
          </h2>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground shadow-lg overflow-hidden">
          <div className="relative aspect-square sm:aspect-video w-full">
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
                    <span className="text-5xl sm:text-6xl font-bold text-primary [text-shadow:0_0_12px_hsl(var(--primary)/0.8)]">€9,00</span>
                    <span className="ml-2 text-xl text-muted-foreground line-through">€27,90</span>
                </div>
                <p className="text-sm text-muted-foreground text-center sm:text-right">
                    Precio en Euro (EUR).<br/>La plataforma convierte a tu moneda local.
                </p>
            </div>
            
            <ul className="space-y-4 text-left mb-6">
                <li className="flex items-start gap-3">
                    <BadgeCheck className="h-6 w-6 text-primary [filter:drop-shadow(0_0_3px_hsl(var(--primary)/0.7))]" />
                    <span>Acceso Exclusivo a TODO el contenido de <span className="font-semibold">{model.name}</span> (y de todas las demás también!).</span>
                </li>
                 <li className="flex items-start gap-3">
                    <BadgeCheck className="h-6 w-6 text-primary [filter:drop-shadow(0_0_3px_hsl(var(--primary)/0.7))]" />
                    <span>Desbloquea el <span className="font-semibold">WhatsApp</span> de <span className="font-semibold">{model.name}</span> para conversaciones privadas.</span>
                </li>
                <li className="flex items-start gap-3">
                    <BadgeCheck className="h-6 w-6 text-primary [filter:drop-shadow(0_0_3px_hsl(var(--primary)/0.7))]" />
                    <span>Participa en un sorteo exclusivo para un viaje en yate con varias modelos. ¡Una experiencia inolvidable!</span>
                </li>
            </ul>

            <div className="flex justify-center my-4">
              <ArrowDown className="h-10 w-10 text-primary animate-bounce" />
            </div>

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
