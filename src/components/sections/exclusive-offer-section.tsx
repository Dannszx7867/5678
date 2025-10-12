'use client';

import type { Model } from '@/app/data/models';
import { Button } from '@/components/ui/button';
import { Lock, ArrowDown } from 'lucide-react';
import Image from 'next/image';

type ExclusiveOfferSectionProps = {
  model: Model;
  onContinue: () => void;
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-6 h-6 flex-shrink-0">
    <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-60"></div>
    <div className="relative text-primary-foreground">{children}</div>
  </div>
);


export default function ExclusiveOfferSection({ model, onContinue }: ExclusiveOfferSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">

        <div className="rounded-2xl border bg-card text-card-foreground shadow-lg overflow-hidden">
           <div className="p-6 text-center">
             <div className="flex items-center justify-center gap-3 mt-2">
                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">Tú elegiste</h2>
                <Image
                    src={model.imageUrl}
                    alt={model.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-primary"
                />
                <p className="text-primary font-semibold text-2xl sm:text-3xl">{model.name}</p>
                {model.flagUrl && (
                    <Image
                        src={model.flagUrl}
                        alt={`Bandera ${model.nationality}`}
                        width={28}
                        height={28}
                        className="rounded-full object-cover w-7 h-7"
                    />
                )}
             </div>
           </div>
          <div className="relative w-full aspect-square sm:aspect-[4/3] p-2">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg shadow-black/30">
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
                    style={{ willChange: 'transform' }}
                />
                ) : (
                    <Image
                        src={model.imageUrl}
                        alt={model.name}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-4">
                <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
            </div>
             <div className="text-center mb-8">
                <h2 className="font-headline text-xl sm:text-3xl font-bold tracking-tight text-foreground">
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
             <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <span className="text-5xl sm:text-6xl font-bold text-primary [text-shadow:0_0_12px_hsl(var(--primary)/0.8)]">$10,90</span>
                    <span className="ml-2 text-xl text-muted-foreground line-through">$27,90</span>
                </div>
                <p className="text-sm text-muted-foreground text-center sm:text-right">
                    Precio en Dólar (USD).<br/>La plataforma convierte a tu moneda local.
                </p>
            </div>
            
            <ul className="space-y-4 text-left mb-6">
                <li className="flex items-start gap-3">
                    <IconWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                    </IconWrapper>
                    <span>Acceso Exclusivo a TODO el contenido de <span className="font-semibold">{model.name}</span> (y de todas las demás también!).</span>
                </li>
                 <li className="flex items-start gap-3">
                    <IconWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                    </IconWrapper>
                    <span>Desbloquea el <span className="font-semibold text-primary">WhatsApp</span> de <span className="font-semibold">{model.name}</span> para conversaciones privadas.</span>
                </li>
                <li className="flex items-start gap-3">
                    <IconWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                    </IconWrapper>
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
