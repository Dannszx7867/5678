import type { Metadata, Viewport } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import Script from 'next/script';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'ModeloMatch',
  description: 'Evalúa a las modelos más deseadas y descubre tu match perfecto.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${space_grotesk.variable}`}>
      <head>
        <link rel="preload" href="/video_01.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video_02.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video_03.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video_04.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video_05.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video_06.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/video_07.mp4" as="video" type="video/mp4" />
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
          strategy="beforeInteractive"
        />
        <Script id="utmify-pixel" strategy="beforeInteractive">
          {`
            window.pixelId = "68d7597df557fac86d7c822b";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
