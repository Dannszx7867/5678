import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsDown, Heart, ArrowDown } from "lucide-react";
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
                <div className="aspect-[4/5] relative bg-black">
                  {model.videoUrl ? (
                    <video 
                      src={model.videoUrl} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      controls 
                      className="w-full h-full object-cover" 
                    />
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
