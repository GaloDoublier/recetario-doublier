"use client";

import { Button } from "@/src/components/ui/button"; // O "@/components/ui/button" según tu ruta
import { Star, Clock, ChefHat, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecipeFilters {
  difficulty: string | null;
  minRicor: number | null;
  maxTime: number | null;
}

interface RecipeFiltersProps {
  filters: RecipeFilters;
  onFiltersChange: (filters: RecipeFilters) => void;
  compact?: boolean;
  disabled?: boolean;
}

const difficultyOptions = ["Baja", "Media", "Alta"];
const ricorOptions = [1, 2, 3, 4, 5];
const timeOptions = [
  { label: "< 30 min", value: 30 },
  { label: "< 60 min", value: 60 },
  { label: "> 60 min", value: 61 },
];

export function RecipeFiltersComponent({ filters, onFiltersChange, compact = false, disabled = false }: RecipeFiltersProps) {
  const hasActiveFilters = filters.difficulty || filters.minRicor || filters.maxTime;

  const clearFilters = () => {
    onFiltersChange({ difficulty: null, minRicor: null, maxTime: null });
  };

  return (
    <div className={cn(
      "bg-card/80 backdrop-blur-sm rounded-xl border border-border p-4 md:p-6 mb-8 card-pattern",
      compact && "mb-0 border-0 bg-transparent p-0 md:p-0"
    )}>
      <div className={cn("flex flex-wrap items-center justify-between gap-4 mb-4", compact && "gap-2")}>
        <h3 className="font-semibold text-foreground font-heading">Filtrar recetas</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground gap-1"
          >
            <X className="w-4 h-4" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className={cn("grid sm:grid-cols-3 gap-6", compact && "grid-cols-1 gap-4 sm:grid-cols-1")}>
        {/* Difficulty */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
            <ChefHat className="w-4 h-4 text-primary" />
            Dificultad
          </label>
          <div className="flex flex-wrap gap-2">
            {difficultyOptions.map((diff) => (
              <Button
                key={diff}
                variant={filters.difficulty === diff ? "default" : "outline"}
                size="sm"
                disabled={disabled}
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    difficulty: filters.difficulty === diff ? null : diff,
                  });
                }}
                className={cn(
                  "transition-all",
                  filters.difficulty === diff && "bg-primary text-primary-foreground"
                )}
              >
                {diff}
              </Button>
            ))}
          </div>
        </div>

        {/* Ricor */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
            <Star className="w-4 h-4 text-primary" />
            Ricor mínimo
          </label>
          <div className="flex flex-wrap gap-2">

            {ricorOptions.map((ricor) => (
              <Button
                key={ricor}
                variant={filters.minRicor === ricor ? "default" : "outline"}
                size="sm"
                disabled={disabled}
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    minRicor: filters.minRicor === ricor ? null : ricor,
                  });
                }}
                className={cn(
                  "transition-all gap-1",
                  filters.minRicor === ricor && "bg-primary text-primary-foreground"
                )}
              >
                {ricor}
                <Star className="w-3 h-3 fill-current" />
              </Button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
            <Clock className="w-4 h-4 text-primary" />
            Tiempo
          </label>
          <div className="flex flex-wrap gap-2">
            {timeOptions.map((time) => (
              <Button
                key={time.value}
                variant={filters.maxTime === time.value ? "default" : "outline"}
                size="sm"
                disabled={disabled}
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    maxTime: filters.maxTime === time.value ? null : time.value,
                  });
                }}
                className={cn(
                  "transition-all",
                  filters.maxTime === time.value && "bg-primary text-primary-foreground"
                )}
              >
                {time.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
}
