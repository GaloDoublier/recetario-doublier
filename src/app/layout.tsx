import type { Metadata } from 'next'
import { Nunito, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from "@/src/components/site-header";
import './globals.css'
import Image from "next/image";

const nunito = Nunito({
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap'
});

const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Recetario-Doublier',
  description: 'Un rincón personal donde comparto mi aventura culinaria como cocinero amateur',
  icons: {
    icon: [
      {
        url: '/galogo.ico',
      },
      {
        url: '/galogo.png',      },
    ],
    apple: '/galogo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${playfair.variable} font-sans antialiased`}>
        <SiteHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
        <footer className="pattern-section border-t border-border bg-card/70 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Image src="/galogo.png" alt="Logo" width={70} height={70} className="text-primary-foreground rounded-full" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Recetario-Doublier — Mi recetario personal y casero
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Tenes alguna sugerencia o queres compartirme una   receta? escribime en mi instagram : <a href="https://www.instagram.com/galodoublier" target="_blank" rel="noopener noreferrer"><strong>@galodoublier</strong></a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
