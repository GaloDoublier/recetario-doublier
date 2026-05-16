import { cn } from "@/lib/utils";
import { Difficulty } from "@/lib/types";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: "sm" | "md";
}

export function DifficultyBadge({ difficulty, size = "md" }: DifficultyBadgeProps) {
  const colorClasses = {
    Baja: "bg-primary/10 text-primary border-primary/20",
    Media: "bg-amber-50 text-amber-700 border-amber-200",
    Alta: "bg-accent/10 text-accent border-accent/20",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium tracking-wide",
        colorClasses[difficulty],
        sizeClasses[size]
      )}
    >
      {difficulty}
    </span>
  );
}
