import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Model } from "@/app/data/models";
import { ArrowDown, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef } from "react";

type Top3SectionProps = {
  models: Model[];
  onContact: (model: Model) => void;
  onContinue: () => void;
};

export default function Top3Section({ models, onContact, onContinue }: Top3SectionProps) {
    const plugin = useRef(
      Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
    );

    const itemsToShow = models.length > 0 ? [...models.slice(0, 3)] : [];

  return (
    <section className="py-16 sm:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Las 3 Modelos Mejor Evaluadas 🔥
          </h2>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-primary tracking-wider flex items-center justify-center gap-2 flex-wrap">
            <span>Elige a tu favorita para conversar abajo.</span>
            <span className="text-lg text-muted-foreground">(Todas hablan español también)</span>
          </p>
          <p className="mt-2 text-base text-muted-foreground">(desliza para ver a tus favoritas)</p>
          <ArrowDown className="h-10 w-10 text-primary mx-auto mt-4 animate-bounce" />
        </div>

        <Carousel
            plugins={itemsToShow.length > 1 ? [plugin.current] : []}
            opts={{
              align: "start",
              loop: itemsToShow.length > 1,
            }}
            className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto"
          >
            <CarouselContent>
              {itemsToShow.map((model) => (
                <CarouselItem key={model.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="overflow-hidden rounded-2xl shadow-lg animate-fade-in flex flex-col h-full">
                      <CardHeader className="p-0">
                        <div className="aspect-[4/5] relative">
                          <Image
                            src={model.imageUrl}
                            alt={`Modelo ${model.name}`}
                            fill
                            className="object-cover"
                            data-ai-hint={model.imageHint}
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOM0wnyfwAFdAK2m0spnAAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4 flex flex-col flex-1 text-center justify-between">
                        <div>
                          <CardTitle className="font-headline text-xl flex items-center justify-center gap-2">
                            {model.name}
                            {model.flagUrl && (
                              <Image
                                src={model.flagUrl}
                                alt={`Bandera ${model.nationality}`}
                                width={24}
                                height={24}
                                className="rounded-full object-cover w-6 h-6"
                              />
                            )}
                          </CardTitle>
                          {model.persona && <p className="text-muted-foreground/80 text-xs font-semibold mt-1.5">{model.persona}</p>}
                        </div>
                        
                        <div className="pt-2">
                           <Button onClick={() => onContact(model)} className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Entrar en Contacto
                            </Button>
                        </div>

                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {itemsToShow.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
      </div>
    </section>
  );
}
