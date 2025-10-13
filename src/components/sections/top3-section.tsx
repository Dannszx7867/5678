'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Model } from "@/app/data/models";
import { ArrowDown, MessageCircle } from "lucide-react";

type Top3SectionProps = {
  models: Model[];
  onContact: (model: Model) => void;
};

export default function Top3Section({ models: allModels, onContact }: Top3SectionProps) {

  return (
    <section className="py-16 sm:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Elige a tu favorita🔥
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            (Todas hablan español)
          </p>
          <ArrowDown className="h-10 w-10 text-primary mx-auto mt-4 animate-bounce" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {allModels.map((model, index) => (
            <div key={model.id} className="h-full">
                <Card className="overflow-hidden rounded-2xl shadow-lg animate-fade-in flex flex-col h-full">
                    <CardHeader className="p-0">
                    <div className="aspect-square relative">
                        <Image
                          src={model.imageUrl}
                          alt={`Modelo ${model.name}`}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full"
                          data-ai-hint={model.imageHint}
                          priority={index < 3}
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute top-2 left-2 bg-green-500/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                            </span>
                            Online
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 space-y-2 flex flex-col flex-1 text-center justify-between">
                    <div>
                        <CardTitle className="font-semibold tracking-tight font-headline text-base sm:text-lg flex items-center justify-center gap-2">
                        {model.name}
                        {model.flagUrl && (
                            <Image
                            src={model.flagUrl}
                            alt={`Bandera ${model.nationality}`}
                            width={18}
                            height={18}
                            className="rounded-full object-cover w-4 h-4 sm:w-6 sm:h-6"
                            loading="lazy"
                            />
                        )}
                        </CardTitle>
                        {model.persona && <p className="text-muted-foreground/80 text-xs sm:text-sm font-semibold mt-1">{model.persona}</p>}
                    </div>
                    
                    <div className="pt-2">
                        <Button onClick={() => onContact(model)} size="lg" className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base py-3 px-3 h-auto">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Entrar en Contacto
                        </Button>
                    </div>

                    </CardContent>
                </Card>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}
