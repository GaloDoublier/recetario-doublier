"use client";

import { useState } from "react";
import { Recipe } from "@/lib/types";
import { Button } from "@/src/components/ui/button";
import { DifficultyBadge } from "./difficulty-badge";
import { StarRating } from "./star-rating";
import { Plus, Edit3, Trash2, LogOut, Search, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface AdminPanelProps {
  recipes: Recipe[];
}

export function AdminPanel({ recipes }: AdminPanelProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Panel de Administración
            </h1>
            <p className="mt-1 text-muted-foreground">
              Gestiona tus recetas desde aquí
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild className="gap-2">
              <Link href="/admin/editor/new">
                <Plus className="w-4 h-4" />
                Nueva Receta
              </Link>
            </Button>
            <Button variant="outline" onClick={()=>{}} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar recetas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-foreground">{recipes.length}</p>
            <p className="text-sm text-muted-foreground">Total Recetas</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-foreground">
              {recipes.filter((r) => r.difficulty === "Baja").length}
            </p>
            <p className="text-sm text-muted-foreground">Dificultad Baja</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-foreground">
              {recipes.filter((r) => r.difficulty === "Media").length}
            </p>
            <p className="text-sm text-muted-foreground">Dificultad Media</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-foreground">
              {recipes.filter((r) => r.difficulty === "Alta").length}
            </p>
            <p className="text-sm text-muted-foreground">Dificultad Alta</p>
          </div>
        </div>

        {/* Recipe list */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">
              Todas las Recetas ({filteredRecipes.length})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {recipe.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <DifficultyBadge difficulty={recipe.difficulty} size="sm" />
                  <StarRating rating={recipe.ricor} size="sm" />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8"
                    >
                      <Link href={`/admin/editor/${recipe.id}`}>
                        <Edit3 className="w-4 h-4" />
                        <span className="sr-only">Editar</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {}}
                      disabled={isDeleting === recipe.id}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      {isDeleting === recipe.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}