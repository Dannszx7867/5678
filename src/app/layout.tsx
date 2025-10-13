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
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${space_grotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://i.imgur.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        <link rel="preload" href="/video_01.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="preload" href="/video_02.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="preload" href="/video_03.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="preload" href="/video_04.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="preload" href="/video_05.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="preload" href="/video_06.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="preload" href="/video_07.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <link rel="prefetch" href="https://pay.mundpay.com/01997438-0b55-73ae-802a-7932995370eb?ref=" as="document" />
        <link rel="prefetch" href="https://pay.mundpay.com/019987c6-c88d-7194-bc3f-95711f7a4fd6?ref=" as="document" />
        
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
         <Script id="fluid-checkout-transition" strategy="afterInteractive">
          {`
            (function() {
              try {
                const enhanceTransitions = () => {
                  document.querySelectorAll("a[href*='pay.mundpay.com'], button[data-checkout-link]").forEach(linkOrButton => {
                    const checkoutUrl = linkOrButton.nodeName === 'BUTTON' ? linkOrButton.dataset.checkoutLink : linkOrButton.href;
                    if (!checkoutUrl) return;
                    
                    const handleClick = e => {
                      e.preventDefault();
                      document.body.style.transition = "opacity 0.3s ease";
                      document.body.style.opacity = "0.7";
                      setTimeout(() => {
                        window.location.href = checkoutUrl;
                      }, 120);
                    };

                    linkOrButton.removeEventListener("click", handleClick);
                    linkOrButton.addEventListener("click", handleClick);
                  });
                };
                
                if (document.readyState === 'complete') {
                  enhanceTransitions();
                } else {
                  window.addEventListener("load", enhanceTransitions);
                }

              } catch (e) {
                console.warn("Otimização de fluidez falhou:", e);
              }
            })();
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
