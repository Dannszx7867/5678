'use client';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Heart, X, Sparkles, Crown, MessageCircle, LoaderCircle } from 'lucide-react';
import { models, type Model } from '@/lib/models';
import { generatePersonalizedBeautyScore, type PersonalizedBeautyScoreOutput } from '@/ai/flows/personalized-beauty-score';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Step = 'intro' | 'evaluating' | 'calculating' | 'results' | 'chat';
type Rating = { modelId: string; modelName: string; rating: boolean };

const ChatSimulation = ({ open, onOpenChange, model }: { open: boolean, onOpenChange: (open: boolean) => void, model: Model }) => {
    const [messages, setMessages] = useState<{ author: 'user' | 'model'; text: string; }[]>([]);

    useEffect(() => {
        if (open) {
            setMessages([]);
            const chatScript = [
                { author: 'model', text: `¡Hola! Me alegro que te gustara mi perfil 😉` },
                { author: 'user', text: `Hola ${model.name}, a mi también!` },
                { author: 'model', text: '¿Qué te pareció más interesante?' },
                { author: 'user', text: 'Tu sonrisa, sin duda.' },
                { author: 'model', text: 'Aww, gracias! 😊 ¿Te gustaría saber más sobre mí?' },
            ];

            let messageIndex = 0;
            const interval = setInterval(() => {
                if (messageIndex < chatScript.length) {
                    setMessages(prev => [...prev, chatScript[messageIndex]]);
                    messageIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [open, model.name]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-background">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-headline">
                        <Avatar>
                            <AvatarImage src={model.imageUrl} alt={model.name} />
                            <AvatarFallback>{model.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        Chat con {model.name}
                    </DialogTitle>
                    <DialogDescription>
                        Esta es una simulación de chat.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-96 flex flex-col space-y-4 p-4 overflow-y-auto rounded-md border">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.author === 'user' ? 'justify-end' : 'justify-start')}>
                            <div className={cn("max-w-[75%] rounded-lg px-3 py-2", msg.author === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default function ModeloMatch() {
    const [step, setStep] = useState<Step>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [result, setResult] = useState<PersonalizedBeautyScoreOutput | null>(null);
    const [animation, setAnimation] = useState<'left' | 'right' | null>(null);
    const [chatModel, setChatModel] = useState<Model | null>(null);

    const progress = (currentIndex / models.length) * 100;
    const currentModel = models[currentIndex];

    const handleRating = (rating: boolean) => {
        if (!currentModel) return;

        setAnimation(rating ? 'right' : 'left');

        setTimeout(() => {
            setRatings([...ratings, { modelId: currentModel.id, modelName: currentModel.name, rating }]);
            
            if (currentIndex < models.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setStep('calculating');
                submitRatings([...ratings, { modelId: currentModel.id, modelName: currentModel.name, rating }]);
            }
            setAnimation(null);
        }, 300);
    };

    const submitRatings = async (finalRatings: Rating[]) => {
        try {
            const aiResult = await generatePersonalizedBeautyScore({
                ratings: finalRatings.map(r => ({ modelName: r.modelName, rating: r.rating }))
            });
            setResult(aiResult);
            setStep('results');
        } catch (error) {
            console.error('Error generating beauty score:', error);
            // Handle error, maybe show an error message and a retry button
            setStep('evaluating'); // Go back to evaluation
        }
    };

    const topModels = useMemo(() => {
        return ratings
            .filter(r => r.rating)
            .map(r => models.find(m => m.id === r.modelId))
            .filter((m): m is Model => m !== undefined)
            .slice(0, 3);
    }, [ratings]);

    const reset = () => {
        setStep('intro');
        setCurrentIndex(0);
        setRatings([]);
        setResult(null);
    };
    
    const renderStep = () => {
        switch (step) {
            case 'intro':
                return (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                        <Logo className="w-24 h-24 text-primary" />
                        <h1 className="text-4xl font-headline mt-4">Bienvenido a ModeloMatch</h1>
                        <p className="text-muted-foreground mt-2 max-w-md">Evalúa a las modelos para descubrir tu Puntuación de Belleza personalizada y encontrar tu match ideal.</p>
                        <Button onClick={() => setStep('evaluating')} className="mt-8" size="lg">
                            Empezar Evaluación
                        </Button>
                    </div>
                );
            case 'evaluating':
                return (
                    <div className="p-4 md:p-8 flex flex-col items-center w-full max-w-md mx-auto">
                        <div className="w-full mb-4">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-muted-foreground text-center mt-2">{currentIndex} / {models.length} evaluadas</p>
                        </div>
                        <div className="relative w-full aspect-[3/4]">
                            {models.map((model, index) => (
                                index === currentIndex && currentModel && (
                                    <Card
                                        key={model.id}
                                        className={cn(
                                            "absolute w-full h-full overflow-hidden transition-transform duration-300 ease-in-out",
                                            animation === 'left' && '-translate-x-full rotate-[-15deg] opacity-0',
                                            animation === 'right' && 'translate-x-full rotate-[15deg] opacity-0'
                                        )}
                                    >
                                        <CardContent className="p-0 relative h-full">
                                            <Image src={model.imageUrl} alt={model.name} fill style={{ objectFit: 'cover' }} className="rounded-lg" data-ai-hint={model.imageHint} />
                                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                <h2 className="text-2xl font-bold text-white font-headline">{model.name}</h2>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-6 w-full">
                            <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-2 border-destructive text-destructive hover:bg-destructive/10" onClick={() => handleRating(false)}>
                                <X className="w-10 h-10" />
                            </Button>
                            <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10" onClick={() => handleRating(true)}>
                                <Heart className="w-10 h-10" />
                            </Button>
                        </div>
                    </div>
                );
            case 'calculating':
                return (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                        <LoaderCircle className="w-16 h-16 text-primary animate-spin" />
                        <h1 className="text-3xl font-headline mt-4">Calculando tu Puntuación...</h1>
                        <p className="text-muted-foreground mt-2">Nuestra IA está analizando tus gustos.</p>
                    </div>
                );
            case 'results':
                return (
                    <div className="p-4 md:p-8 flex flex-col items-center w-full max-w-2xl mx-auto">
                        <Sparkles className="w-16 h-16 text-primary" />
                        <h1 className="text-4xl font-headline mt-4 text-center">¡Resultados Listos!</h1>
                        {result && (
                            <Card className="mt-6 w-full text-center p-6 bg-accent">
                                <p className="text-lg">Tu Puntuación de Belleza Personalizada es</p>
                                <p className="text-7xl font-bold text-primary my-2 font-headline">{result.beautyScore}</p>
                                <p className="text-muted-foreground max-w-md mx-auto">{result.suggestedContent}</p>
                            </Card>
                        )}
                        <div className="mt-8 w-full">
                            <h3 className="text-2xl font-headline flex items-center justify-center gap-2"><Crown className="text-amber-400" /> Tu Top 3</h3>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {topModels.map(model => (
                                    <div key={model.id} className="relative group cursor-pointer" onClick={() => setChatModel(model)}>
                                        <Card className="overflow-hidden aspect-square">
                                            <Image src={model.imageUrl} alt={model.name} fill style={{ objectFit: 'cover' }} data-ai-hint={model.imageHint} />
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <MessageCircle className="w-8 h-8 text-white" />
                                            </div>
                                        </Card>
                                        <p className="text-center font-semibold mt-2">{model.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button onClick={reset} className="mt-12" variant="outline">Volver a Empezar</Button>
                    </div>
                );

            default: return null;
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            {renderStep()}
            {chatModel && <ChatSimulation open={!!chatModel} onOpenChange={(open) => !open && setChatModel(null)} model={chatModel} />}
        </main>
    );
}
