import { Receta } from "@prisma/client";
import { DifficultyBadge } from "./difficulty-badge";
import { StarRating } from "./star-rating";
import { Clock } from "lucide-react";

interface RecipeCardProps {
  recipe: Receta;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 card-pattern">
      <div className="relative h-48 w-full bg-muted overflow-hidden">
        {recipe.imagen_url ? (
          <img
            src={recipe.imagen_url}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground/50">
            <div className="absolute inset-0" style={{ backgroundImage: 'url(/pattern-bg.jpg)', backgroundRepeat: 'repeat', backgroundSize: '100px 100px', opacity: 0.06 }} />
            <span className="relative z-1 text-sm">Sin foto</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 relative z-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1">
            {recipe.title}
          </h3>
          <DifficultyBadge difficulty={recipe.difficulty as any} size="sm" />
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <StarRating rating={recipe.ricor} size="sm" />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5 text-primary/60" />
            <span>{recipe.totalTime} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}