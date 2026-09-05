"use client";

import { FormEvent, useState } from "react";
import type { WishlistItem } from "@/lib/types";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { ChefHat, Lightbulb, Loader2, Plus, Trash2 } from "lucide-react";

interface WishlistManagerProps {
  initialItems: WishlistItem[];
}

export function WishlistManager({ initialItems }: WishlistManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !description.trim() || isAdding) return;

    setIsAdding(true);
    setError(null);

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo agregar la idea");
      }

      setItems((current) => [payload as WishlistItem, ...current]);
      setTitle("");
      setDescription("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo agregar la idea",
      );
    } finally {
      setIsAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (deletingId) return;

    setDeletingId(id);
    setError(null);

    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo eliminar la idea");
      }

      setItems((current) => current.filter((item) => item.id !== id));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "No se pudo eliminar la idea",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="mb-10 overflow-hidden rounded-2xl border border-secondary-foreground/15 bg-card shadow-sm">
      <div className="grid lg:grid-cols-[minmax(300px,0.82fr)_1.18fr]">
        <div className="relative overflow-hidden bg-secondary/55 p-5 sm:p-7">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 size-36 rounded-full border-[22px] border-primary/8"
          />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Lightbulb className="size-5" />
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  Próximamente
                </p>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Wishlist de cocina
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Anotá platos que todavía no tienen receta. Van a poder entrar en
              la ruleta como ideas, sin mezclarse con el recetario publicado.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div>
                <label htmlFor="wishlist-title" className="sr-only">
                  Nombre del plato
                </label>
                <Input
                  id="wishlist-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ej. Ravioles de calabaza"
                  maxLength={100}
                  required
                  disabled={isAdding}
                  className="h-11 bg-card/90"
                />
              </div>
              <div>
                <label htmlFor="wishlist-description" className="sr-only">
                  Breve descripción
                </label>
                <Textarea
                  id="wishlist-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Una breve descripción para recordar la idea…"
                  maxLength={280}
                  required
                  disabled={isAdding}
                  className="min-h-24 resize-none bg-card/90"
                />
                <p className="mt-1.5 text-right text-xs text-muted-foreground">
                  {description.length}/280
                </p>
              </div>
              <Button
                type="submit"
                disabled={!title.trim() || !description.trim() || isAdding}
                className="h-11 w-full rounded-xl"
              >
                {isAdding ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Plus />
                )}
                {isAdding ? "Guardando…" : "Agregar a la wishlist"}
              </Button>
            </form>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Ideas anotadas
              </h3>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "plato pendiente" : "platos pendientes"}
              </p>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-secondary-foreground">
              {items.length}
            </span>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-4 rounded-xl border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm font-semibold text-destructive"
            >
              {error}
            </p>
          )}

          {items.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/25 px-6 text-center">
              <ChefHat className="size-9 text-primary/55" />
              <p className="mt-3 font-semibold text-foreground">
                La hoja está en blanco
              </p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Agregá el primer plato que te gustaría cocinar próximamente.
              </p>
            </div>
          ) : (
            <ol className="max-h-[430px] space-y-2 overflow-y-auto pr-1">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className="group grid grid-cols-[2rem_1fr_auto] items-start gap-3 rounded-xl border border-border bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,color-mix(in_oklch,var(--border)_45%,transparent)_32px)] p-3 transition-colors hover:border-primary/25 hover:bg-secondary/15"
                >
                  <span className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-secondary/70 font-heading text-sm font-bold text-secondary-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 py-0.5">
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === item.id}
                        className="size-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Trash2 />
                        )}
                        <span className="sr-only">Eliminar {item.title}</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Quitar de la wishlist</AlertDialogTitle>
                        <AlertDialogDescription>
                          ¿Querés borrar “{item.title}”? La idea dejará de estar
                          disponible en la ruleta.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
