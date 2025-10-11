import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsDown, Heart, ArrowDown, Eye, MessageCircle } from "lucide-react";
import type { Model } from "@/app/data/models";
import { Progress } from "@/components/ui/progress";

type EvaluationSectionProps = {
  model: Model | null;
  onRate: (modelId: string, modelName: string, rating: boolean) => void;
  onFinish: () => void;
  current: number;
  total: number;
  isFirst: boolean;
};

export default function EvaluationSection({ model, onRate, onFinish, current, total, isFirst }: EvaluationSectionProps) {
  const progress = (current / total) * 100;
  const isEvaluationFinished = current >= total;
  
  const handleRate = (rating: boolean) => {
    if (!model) return;
    onRate(model.id, model.name, rating);
    if(isEvaluationFinished) {
      onFinish();
    }
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-sm mx-auto">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">{Math.min(current, total)} de {total}</p>
        </div>
        {model ? (
          <div className="animate-fade-in px-4 sm:px-0 max-w-sm mx-auto">
            <Card className="mx-auto w-full overflow-hidden rounded-2xl shadow-2xl">
              <CardHeader className="p-0">
                <div 
                  className="relative bg-black w-full"
                >
                  <div className="relative w-full aspect-square md:aspect-[4/5] mx-auto">
                    {model.videoUrl ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
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
                        <div
                          className="video-overlay"
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '12px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '500',
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                          }}
                        >
                          <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {model.name}
                            {model.flagUrl && (
                              <Image src={model.flagUrl} alt={`Bandera ${model.nationality}`} width={20} height={20} className="rounded-full" />
                            )}
                          </span>
                          <span style={{ opacity: 0.9 }}>@{model.persona}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                            <span><Eye size={16} className="inline-block mr-1" /> {model.photos}</span>
                            <span><MessageCircle size={16} className="inline-block mr-1" /> {model.videos}</span>
                            <span><Heart size={16} className="inline-block mr-1" /> {model.followers}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={model.evaluationImageUrl ?? model.imageUrl}
                        alt={`Modelo ${model.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={model.imageHint}
                        sizes="(max-width: 640px) 90vw, 384px"
                        priority={isFirst}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOM0wnyfwAFdAK2m0spnAAAAABJRU5ErkJggg=="
                      />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-center">
                 <div className="flex justify-center mb-2">
                    <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4 p-6 pt-0">
                <Button
                  onClick={() => handleRate(false)}
                  variant="outline"
                  className="w-full rounded-full py-6 text-base font-bold border-2 border-destructive bg-background text-destructive hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-transform flex items-center justify-center"
                >
                  <ThumbsDown className="mr-2 flex-shrink-0" /> <span className="whitespace-nowrap">No me gusta</span>
                </Button>
                <Button
                  onClick={() => handleRate(true)}
                  className="w-full rounded-full py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-transform flex items-center justify-center"
                >
                  <Heart className="mr-2 fill-current flex-shrink-0" /> <span className="whitespace-nowrap">Me gusta</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : null}
      </div>
    </section>
  );
}
