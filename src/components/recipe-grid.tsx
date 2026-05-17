"use client";

import { Receta } from "@prisma/client"; 
import { RecipeCard } from "./recipe-card";
import { RecipeFiltersComponent, RecipeFilters } from "./recipe-filters";
import { forwardRef, useState, useMemo } from "react";
import Link from "next/link";

interface RecipeGridProps {
  recipes: Receta[];
}

export const RecipeGrid = forwardRef<HTMLElement, RecipeGridProps>(
  function RecipeGrid({ recipes }, ref) {
    const [filters, setFilters] = useState<RecipeFilters>({
      difficulty: null,
      minRicor: null,
      maxTime: null,
    });

    const filteredRecipes = useMemo(() => {
      const result = recipes.filter((recipe) => {
        if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
        if (filters.minRicor && recipe.ricor < filters.minRicor) return false;
        if (filters.maxTime) {
          if (filters.maxTime === 61) {
            if (recipe.totalTime <= 60) return false;
          } else {
            if (recipe.totalTime > filters.maxTime) return false;
          }
        }
        return true;
      });
      return result;
    }, [recipes, filters]);

    return (
      <section ref={ref} id="recipes" className=" relative pattern-bg">
        
        {/* 2. Al contenedor interno le damos forma de "tarjeta" gigante */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 lg:px-12 min-h-screen relative z-10 pattern-section bg-background overflow-hidden">
          
          <div className="text-center mb-12 animate-fade-in-up relative z-20">
            <span className="text-primary font-medium text-sm uppercase tracking-[0.2em]">
              Mis Creaciones
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-foreground text-balance leading-tight">
              Recetas del Corazón
            </h2>
            <div className="section-divider mt-4" />
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cada receta tiene su historia, sus tropiezos y sus triunfos. Aquí comparto las que mejor me han salido... ¡después de varios intentos!
            </p>
          </div>

          <div className="animate-fade-in-up delay-1 relative z-20">
            <RecipeFiltersComponent filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="relative z-20">
            {filteredRecipes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, i) => (
                  <Link key={recipe.slug} href={`/recetas/${recipe.slug}`} className="block animate-fade-in-up" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                    <RecipeCard recipe={recipe} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍳</span>
                </div>
                <p className="text-muted-foreground text-lg">
                  Parece que todavía no cociné lo que buscas :&apos;C
                </p>
                <p className="text-sm text-muted-foreground/60 mt-2">
                  ¡Pronto habrá más recetas!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);