"use client";

import { Receta } from "@prisma/client";
import { DifficultyBadge } from "./difficulty-badge";
import { StarRating } from "./star-rating";
import { Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RecipeDetailProps {
  recipe: Receta;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <article className="py-12 md:py-20 min-h-screen pattern-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden card-pattern animate-scale-in">
          {recipe.imagen_url ? (
            <div className="w-full h-72 md:h-96 relative bg-secondary overflow-hidden">
              <img
                src={recipe.imagen_url}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-secondary flex items-center justify-center relative">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url(/pattern-bg.jpg)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "120px 120px",
                  opacity: 0.06,
                }}
              />
              <span className="relative z-1 text-secondary-foreground/50">
                Sin imagen
              </span>
            </div>
          )}

          <div className="p-8 md:p-12 lg:p-16">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground text-balance mb-6 leading-tight">
                {recipe.title}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                {recipe.description}
              </p>

              <div className="inline-flex flex-wrap items-center justify-center gap-6 p-4 bg-muted/50 rounded-2xl border border-border/50 shadow-sm">
                <DifficultyBadge
                  difficulty={recipe.difficulty as any}
                  size="md"
                />
                <div className="w-px h-6 bg-border hidden sm:block"></div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{recipe.totalTime} minutos</span>
                </div>
                <div className="w-px h-6 bg-border hidden sm:block"></div>
                <StarRating rating={recipe.ricor} size="md" />
              </div>
            </header>

            <div className="section-divider mb-12" />
            <div
              className="prose prose-stone dark:prose-invert md:prose-lg max-w-none mx-auto
                prose-headings:text-foreground prose-headings:font-bold prose-headings:font-heading
                prose-h2:text-primary prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:mb-6
                prose-h3:text-foreground prose-h3:mt-8
                prose-a:text-primary hover:prose-a:text-primary/80
                prose-li:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-strong:text-foreground prose-strong:font-semibold
                prose-img:rounded-xl prose-img:shadow-md"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {recipe.contenido_markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}