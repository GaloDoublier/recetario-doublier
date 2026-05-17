"use client";

import { author } from "@/lib/constant-data";
import { Button } from "@/src/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

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
                <Image
                  src={author.photos[0]}
                  alt="En mi cocina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-accent shadow-sm">
                  soy ese
                </div>
              </div>
              <div className="hidden sm:block aspect-square rounded-xl overflow-hidden relative ring-1 ring-black/5">
                <Image
                  src={author.photos[1]}
                  alt="Galo Doublier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="hidden sm:block aspect-square rounded-xl overflow-hidden relative ring-1 ring-black/5">
                <Image
                  src={author.photos[2]}
                  alt="Galo Doublier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
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
            
            <div className="mt-6 text-muted-foreground leading-relaxed prose prose-stone dark:prose-invert max-w-none
                            prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-semibold">
              <ReactMarkdown>{author.bio}</ReactMarkdown>
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
