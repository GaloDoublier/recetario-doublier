export type Difficulty = "Baja" | "Media" | "Alta";

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  ricor: number; // 1-5 stars
  imageUrl?: string;
  ingredients: string[];
  steps: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime: number; // in minutes for filtering
  content: string; // Markdown/HTML content for recipe detail
}

export interface Author {
  name: string;
  bio: string;
  photos: string[];
}

export interface Maestro {
  name: string;
  description: string;
  imageUrl: string;
}
