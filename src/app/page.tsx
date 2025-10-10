'use client';

import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero-section';
import { models } from '@/app/data/models';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const startEvaluation = () => {
    router.push('/evaluation');
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection onStart={startEvaluation} />
      </main>
    </div>
  );
}
