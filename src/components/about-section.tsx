"use client";

import { author } from "@/lib/mock-data";
import { Button } from "@/src/components/ui/button";
import { Camera, Heart } from "lucide-react";
import Link from "next/link";

interface AboutSectionProps {
  onViewRecipes?: () => void;
}

export function AboutSection({ onViewRecipes }: AboutSectionProps) {
  return (
    <section className="py-16 md:py-24 pattern-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo gallery */}
          <div className="relative animate-fade-in-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg ring-1 ring-black/5">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/70">
                  <div className="absolute inset-0" style={{ backgroundImage: 'url(/pattern-bg.jpg)', backgroundRepeat: 'repeat', backgroundSize: '120px 120px', opacity: 0.08 }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-accent/15" />
                </div>
                <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-accent shadow-sm">
                  En mi cocina
                </div>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative ring-1 ring-black/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5">
                  <div className="absolute inset-0" style={{ backgroundImage: 'url(/pattern-bg.jpg)', backgroundRepeat: 'repeat', backgroundSize: '100px 100px', opacity: 0.06 }} />
                </div>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative ring-1 ring-black/5">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent/5">
                  <div className="absolute inset-0" style={{ backgroundImage: 'url(/pattern-bg.jpg)', backgroundRepeat: 'repeat', backgroundSize: '100px 100px', opacity: 0.06 }} />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/50 rounded-full blur-2xl" />
          </div>

          {/* About content */}
          <div className="relative z-10 animate-fade-in-up delay-2">
            <span className="text-primary font-medium text-sm uppercase tracking-[0.2em]">
              Sobre Mí
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-heading font-bold text-foreground text-balance leading-tight">
              ¡Hola! Soy {author.name}
            </h1>
            
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Una apasionada de la cocina casera que apenas está aprendiendo los secretos del buen comer.
              </p>
              
              <div className="decorative-quote bg-secondary/30 rounded-lg p-5 border-l-4 border-primary">
                <p className="text-sm font-medium text-secondary-foreground leading-relaxed">
                  <strong>Aviso importante:</strong> No soy chef profesional ni tengo formación culinaria formal. Simplemente soy una persona curiosa que disfruta experimentando en la cocina, a veces con éxito y otras... ¡aprendemos de los errores!
                </p>
              </div>
              
              <p>
                Este rincón digital es donde comparto mis aventuras culinarias, las recetas que me han funcionado (después de varios intentos), y los trucos que voy descubriendo en el camino.
              </p>
              <p>
                Mi filosofía es simple: la cocina debe ser <strong>divertida</strong>, <strong>accesible</strong> y <strong>sin pretensiones</strong>.
              </p>
            </div>
            <Link href="/recetas" className="inline-block mt-8">
              <Button
                onClick={onViewRecipes}
                size="lg"
                className="gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <Heart className="w-4 h-4" />
                Ver Mis Recetas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
