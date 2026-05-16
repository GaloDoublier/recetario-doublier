"use client";

import { Maestro } from "@/lib/types";
import Image from "next/image";

interface MaestrosSectionProps {
  maestros: Maestro[];
}

export function MaestrosSection({ maestros }: MaestrosSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-card/60 pattern-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-[0.2em]">
            Con cariño y gratitud
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-foreground text-balance leading-tight">
            Mis Maestros
          </h2>
          <div className="section-divider mt-4" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Todo lo que sé de cocina se lo debo a estas tres personas increíbles 
            que me han guiado con paciencia y amor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {maestros.map((maestro, i) => (
            <article
              key={maestro.name}
              className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg card-pattern animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-secondary">
                <div className="absolute inset-0 z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/20 to-transparent" />
                <Image
                  src={maestro.imageUrl}
                  alt={maestro.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative z-1">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {maestro.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {maestro.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
