import type { Metadata } from 'next'
import { Nunito, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from "@/src/components/site-header";
import './globals.css'

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
  title: 'Mi Cocina — Recetas Caseras',
  description: 'Un rincón personal donde comparto mi aventura culinaria como cocinero amateur',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
        <footer className="pattern-section border-t border-border bg-card/70 py-10 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-xs font-heading italic">M</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mi Cocina — Un proyecto personal de recetas caseras
                </p>
              </div>
              <p className="text-xs text-muted-foreground/60">
                Hecho con amor por un cocinero novato
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
