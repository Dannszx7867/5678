'use client';

import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import type { PersonalizedBeautyScoreInput, PersonalizedBeautyScoreOutput } from '@/ai/flows/personalized-beauty-score';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/layout/header';
import EvaluationSection from '@/components/sections/evaluation-section';
import Top3Section from '@/components/sections/top3-section';
import ChatSimulationSection from '@/components/sections/chat-simulation-section';
import CheckoutSection from '@/components/sections/checkout-section';
import EvaluationCompletePopup from '@/components/sections/evaluation-complete-popup';


import { models, type Model } from '@/app/data/models';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Footer from '@/components/layout/footer';

type Step = 'evaluating' | 'top3' | 'chat' | 'checkout';
type Rating = { modelId: string; modelName: string; rating: boolean };


function EvaluationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>('evaluating');
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [selectedModelForChat, setSelectedModelForChat] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const top3Ref = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always start fresh, remove any saved progress to prevent skipping steps.
    if (typeof window !== 'undefined') {
      localStorage.removeItem('avaliador-progress-v1');
    }
  }, []);

  const saveProgress = (newRatings: Rating[], newIndex: number, newStep: Step, selectedModelId: string | null = null) => {
    try {
      if (typeof window !== 'undefined') {
        const progress = {
          ratings: newRatings,
          currentModelIndex: newIndex,
          step: newStep,
          selectedModelForChatId: selectedModelId,
        };
        localStorage.setItem('avaliador-progress-v1', JSON.stringify(progress));
      }
    } catch (error)
    {
      console.error("Failed to save progress to localStorage", error);
    }
  };

  const showTop3 = () => {
    setShowCompletionPopup(false);
    setStep('top3');
    saveProgress(ratings, currentModelIndex, 'top3');
    setTimeout(() => {
      top3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const showChat = (model: Model) => {
    setSelectedModelForChat(model);
    setStep('chat');
    saveProgress(ratings, currentModelIndex, 'chat', model.id);
  };
  
  const showCheckout = () => {
    setStep('checkout');
    saveProgress(ratings, currentModelIndex, 'checkout', selectedModelForChat?.id ?? null);
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRating = (modelId: string, modelName: string, rating: boolean) => {
    const newRatings = [...ratings, { modelId, modelName, rating }];
    setRatings(newRatings);
    
    const nextIndex = currentModelIndex + 1;
    
    if (nextIndex < models.length) {
      setCurrentModelIndex(nextIndex);
      saveProgress(newRatings, nextIndex, 'evaluating');
    } else {
      setCurrentModelIndex(nextIndex);
      saveProgress(newRatings, nextIndex, 'evaluating');
      setShowCompletionPopup(true);
    }
  };

  const handleFinishEvaluation = () => {
    window.location.href = isPremium 
      ? 'https://pay.mundpay.com/019987c6-c88d-7194-bc3f-95711f7a4fd6' 
      : 'https://pay.mundpay.com/01997438-0b55-73ae-802a-7932995370eb';
  }

  const allModels = useMemo(() => {
    return models;
  }, []);

  const modelsToPreload = useMemo(() => {
    return models.slice(currentModelIndex + 1, currentModelIndex + 3);
  }, [currentModelIndex]);
  
  const allStepsCompleted = currentModelIndex >= models.length;
  const [isPremium, setIsPremium] = useState(false);

  if (step === 'chat' && selectedModelForChat) {
    return <ChatSimulationSection model={selectedModelForChat} onContinue={showCheckout} />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Head>
        {modelsToPreload.map(model => (
          <link
            key={`preload-${model.id}`}
            rel="preload"
            as="image"
            href={model.evaluationImageUrl ?? model.imageUrl}
          />
        ))}
      </Head>
      <Header />
      <EvaluationCompletePopup isOpen={showCompletionPopup} onAction={showTop3} />
      <main className="flex-1 pt-16">
        {step === 'evaluating' && !allStepsCompleted && (
          <div className="py-8 sm:py-12">
            <EvaluationSection
              key={currentModelIndex}
              model={currentModelIndex < models.length ? models[currentModelIndex] : null}
              onRate={handleRating}
              onFinish={() => setShowCompletionPopup(true)}
              current={Math.min(currentModelIndex + 1, models.length)}
              total={models.length}
              isFirst={currentModelIndex === 0}
            />
          </div>
        )}
        
        {step === 'top3' && (
          <div ref={top3Ref} className="scroll-mt-16">
            <Top3Section models={allModels} onContact={showChat} onContinue={showCheckout} />
          </div>
        )}

        {step === 'checkout' && (
            <div ref={checkoutRef} className="scroll-mt-16">
            <CheckoutSection onContinue={handleFinishEvaluation} onPlanChange={setIsPremium} />
          </div>
        )}
      </main>
    </div>
  );
}

export default function EvaluationPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Cargando...</div>}>
      <EvaluationContent />
    </Suspense>
  )
}
