import Image from "next/image";
import { Lock, Heart, Eye, Video, Users, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { models } from "@/app/data/models";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import Link from "next/link";

type HeroSectionProps = {
  onStart: () => void;
};

export default function HeroSection({ onStart }: HeroSectionProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="container mx-auto px-4 pt-8 pb-16 text-center sm:pt-16 sm:pb-24">
      <div className="flex items-center justify-center gap-2">
        <Lock className="text-primary" />
        <Heart className="text-destructive" />
      </div>
      <h1 className="mt-4 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        Evalúa modelos <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">internacionales</span> y <span className="text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.7)]">brasileñas</span>, elige tus favoritas para una conversación privada
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        Desliza hacia abajo y haz clic en “Comenzar Evaluación” para evaluar.
      </p>
      
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <ArrowDown className="h-10 w-10 animate-bounce text-primary" />
      </div>

      <div className="mt-10">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent>
            {models.map((model, index) => (
              <CarouselItem key={model.id} className="basis-full sm:basis-1/2 md:basis-1/3">
                <div className="p-2">
                  <Card className="overflow-hidden rounded-2xl">
                    <CardContent className="relative flex aspect-square items-center justify-center p-0">
                      <Image
                        src={model.imageUrl}
                        alt={`Modelo ${model.name}`}
                        fill
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                        data-ai-hint={model.imageHint}
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end text-center">
                        <div>
                          <p className="text-white font-bold text-lg flex items-center justify-center gap-2">
                            {model.name}
                            {model.flagUrl && (
                              <Image
                                src={model.flagUrl}
                                alt={`Bandera ${model.nationality}`}
                                width={20}
                                height={20}
                                className="rounded-full object-cover w-5 h-5"
                                loading="lazy"
                              />
                            )}
                          </p>
                          {model.persona && <p className="text-sm font-semibold text-white/70 mt-1">{model.persona}</p>}
                        </div>
                        <div className="flex items-center justify-center gap-3 text-white text-xs font-bold mt-2">
                           <div className="flex items-center gap-1">
                                <Eye size={16} />
                                <span>{model.photos}</span>
                           </div>
                           <div className="flex items-center gap-1">
                                <Video size={16} />
                                <span>{model.videos}</span>
                           </div>
                           <div className="flex items-center gap-1">
                                <Users size={16} />
                                <span>{model.followers}</span>
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <ArrowDown className="h-10 w-10 animate-bounce text-primary" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-x-6">
        <Link href="/evaluation" passHref>
          <Button
            id="hero-start-button"
            onClick={onStart}
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Comenzar Evaluación
          </Button>
        </Link>
      </div>
    </section>
  );
}
