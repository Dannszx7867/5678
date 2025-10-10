import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function UnlockedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4 pt-16">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <CheckCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="mt-4 font-headline text-2xl">¡Acceso Desbloqueado!</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Estás un paso más cerca. Continúa para finalizar tu acceso exclusivo y conversar con las modelos.
            </CardDescription>
            <Link href="/" passHref>
              <Button size="lg" className="mt-6 w-full rounded-full font-semibold active:scale-95">
                Finalizar y Acceder
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
