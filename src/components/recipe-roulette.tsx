"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  Clock3,
  Lightbulb,
  RefreshCcw,
  RotateCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { DifficultyBadge } from "@/src/components/difficulty-badge";
import { StarRating } from "@/src/components/star-rating";
import { RecipeFiltersComponent, type RecipeFilters } from "@/src/components/recipe-filters";
import { Checkbox } from "@/src/components/ui/checkbox";

type RouletteRecipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  totalTime: number;
  ricor: number;
  imagen_url: string | null;
};

type RouletteWishlistItem = {
  id: string;
  title: string;
  description: string;
};

type RouletteItem =
  | (RouletteRecipe & { kind: "recipe" })
  | (RouletteWishlistItem & { kind: "wishlist" });

const SLICE_COLORS = [
  "#d83a2f",
  "#f3c969",
  "#dc713e",
  "#4f6f52",
  "#f0a95c",
  "#7f392e",
  "#e7b94f",
  "#69855e",
];

const WISHLIST_SLICE_COLORS = ["#315d69", "#467d84"];

function itemKey(item: RouletteItem) {
  return `${item.kind}:${item.id}`;
}

function polarToCartesian(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    // Redondear evita diferencias mínimas de coma flotante entre SSR y navegador.
    x: Number((200 + radius * Math.cos(radians)).toFixed(4)),
    y: Number((200 + radius * Math.sin(radians)).toFixed(4)),
  };
}

function sectorPath(index: number, count: number) {
  const slice = 360 / count;
  const start = polarToCartesian(index * slice, 188);
  const end = polarToCartesian((index + 1) * slice, 188);
  const largeArc = slice > 180 ? 1 : 0;

  return `M 200 200 L ${start.x} ${start.y} A 188 188 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

function titleLines(title: string, count: number) {
  const maxPerLine = count > 18 ? 10 : count > 10 ? 14 : 19;
  if (title.length <= maxPerLine) return [title];

  const words = title.split(/\s+/);
  const lines: string[] = [""];

  for (const word of words) {
    const current = lines[lines.length - 1];
    const candidate = current ? `${current} ${word}` : word;

    if (!current || candidate.length <= maxPerLine || lines.length === 2) {
      lines[lines.length - 1] = candidate;
    } else {
      lines.push(word);
    }
  }

  const secondLineLimit = maxPerLine + 5;
  if (lines[1]?.length > secondLineLimit) {
    lines[1] = `${lines[1].slice(0, secondLineLimit - 1).trimEnd()}…`;
  }

  return lines.slice(0, 2);
}

export function RecipeRoulette({
  recipes,
  wishlistItems,
}: {
  recipes: RouletteRecipe[];
  wishlistItems: RouletteWishlistItem[];
}) {
  const [filters, setFilters] = useState<RecipeFilters>({
    difficulty: null,
    minRicor: null,
    maxTime: null,
  });
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [includeRecipes, setIncludeRecipes] = useState(true);
  const [includeWishlist, setIncludeWishlist] = useState(false);
  const [winner, setWinner] = useState<RouletteItem | null>(null);
  const [pendingWinner, setPendingWinner] = useState<RouletteItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const spinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const pointerAnimation = useRef<Animation | null>(null);

  const filteredRecipes = useMemo(
    () =>
      recipes
        .filter((recipe) => {
          if (filters.difficulty && recipe.difficulty !== filters.difficulty)
            return false;
          if (filters.minRicor && recipe.ricor < filters.minRicor) return false;
          if (filters.maxTime === 61 && recipe.totalTime <= 60) return false;
          if (
            filters.maxTime &&
            filters.maxTime !== 61 &&
            recipe.totalTime > filters.maxTime
          )
            return false;
          return true;
        })
        .map((recipe) => ({ ...recipe, kind: "recipe" as const })),
    [recipes, filters],
  );

  const rouletteItems = useMemo<RouletteItem[]>(
    () => [
      ...(includeRecipes ? filteredRecipes : []),
      ...(includeWishlist
        ? wishlistItems.map((item) => ({ ...item, kind: "wishlist" as const }))
        : []),
    ],
    [filteredRecipes, includeRecipes, includeWishlist, wishlistItems],
  );

  const available = useMemo(
    () => rouletteItems.filter((item) => !removedIds.includes(itemKey(item))),
    [rouletteItems, removedIds],
  );

  const removedCount = removedIds.length;
  const hasEnabledSource = includeRecipes || includeWishlist;

  const sliceAngle = available.length ? 360 / available.length : 360;
  const labelRadius = useMemo(() => {
    if (available.length > 16) return 142;
    if (available.length > 9) return 134;
    return 122;
  }, [available.length]);

  useEffect(() => {
    if (!isSpinning || !pointerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let elapsed = 0;
    let delay = 55;

    const collide = () => {
      if (cancelled || !pointerRef.current || elapsed > 4680) return;
      const progress = Math.min(elapsed / 4680, 1);
      const impact = 20 * Math.pow(1 - progress, 1.65);

      pointerAnimation.current?.cancel();
      pointerAnimation.current = pointerRef.current.animate(
        [
          { transform: "translateX(-50%) rotate(0deg)" },
          { transform: `translateX(-50%) rotate(${impact}deg)` },
          { transform: `translateX(-50%) rotate(${-impact * 0.3}deg)` },
          { transform: "translateX(-50%) rotate(0deg)" },
        ],
        { duration: Math.min(270, delay * 1.65), easing: "cubic-bezier(.2,.8,.25,1)" },
      );

      elapsed += delay;
      delay = Math.min(delay * 1.09, 520);
      window.setTimeout(collide, delay);
    };

    collide();
    return () => {
      cancelled = true;
      pointerAnimation.current?.cancel();
    };
  }, [isSpinning]);

  function spin(pool = available) {
    if (isSpinning || pool.length < 2) return;

    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    const selectedIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[selectedIndex];
    const angle = 360 / pool.length;
    const selectedCenter = selectedIndex * angle + angle / 2;

    setWinner(null);
    setPendingWinner(selected);
    setIsSpinning(true);
    setRotation((current) => {
      const currentNormalized = ((current % 360) + 360) % 360;
      const targetNormalized = ((-selectedCenter % 360) + 360) % 360;
      const alignment = (targetNormalized - currentNormalized + 360) % 360;
      return current + 360 * (5 + Math.floor(Math.random() * 3)) + alignment;
    });

    // Respaldo para navegadores que no emitan transitionend.
    spinTimeout.current = setTimeout(() => finishSpin(selected), 5300);
  }

  function finishSpin(selected = pendingWinner) {
    if (!selected) return;
    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    setIsSpinning(false);
    setWinner(selected);
    setPendingWinner(null);
    setModalOpen(true);
  }

  function spinAgain() {
    if (!winner) return;
    setModalOpen(false);
    setWinner(null);
    window.setTimeout(() => spin(available), 280);
  }

  function removeWinnerFromRoulette() {
    if (!winner) return;
    setRemovedIds((ids) => [...ids, itemKey(winner)]);
    setModalOpen(false);
    setWinner(null);
  }

  function restoreDiscarded() {
    setRemovedIds([]);
    setWinner(null);
    setModalOpen(false);
    setRotation(0);
  }

  function updateFilters(nextFilters: RecipeFilters) {
    if (isSpinning) return;
    setFilters(nextFilters);
    setRotation(0);
    setWinner(null);
  }

  function updateWishlistVisibility(checked: boolean) {
    if (isSpinning) return;
    setIncludeWishlist(checked);
    setRotation(0);
    setWinner(null);
  }

  function updateRecipeVisibility(checked: boolean) {
    if (isSpinning) return;
    setIncludeRecipes(checked);
    setRotation(0);
    setWinner(null);
  }

  return (
    <section className="roulette-page pattern-bg relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="roulette-orbit roulette-orbit-one" aria-hidden="true" />
      <div className="roulette-orbit roulette-orbit-two" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl bg-background/95 px-4 py-10 sm:px-8 md:py-16 lg:px-12">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
            ¿No sabés qué comer hoy?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tirá la ruleta y animate a cocinar algo. Algunos platos tienen la
            receta disponible, otros todavía no los cociné (pronto estarán)
          </p>
        </header>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="relative mx-auto w-full max-w-[610px]">
            <div
              ref={pointerRef}
              className="roulette-pointer"
              aria-hidden="true"
            >
              <ChefHat className="size-5" />
            </div>

            <div className="roulette-frame aspect-square w-full rounded-full p-[clamp(10px,2.4vw,18px)]">
              <div
                className="relative h-full w-full rounded-full will-change-transform"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "transform 5.1s cubic-bezier(0.12, 0.72, 0.08, 1)"
                    : "none",
                }}
                onTransitionEnd={(event) => {
                  if (event.propertyName === "transform" && isSpinning)
                    finishSpin();
                }}
              >
                <svg
                  viewBox="0 0 400 400"
                  className="h-full w-full"
                  role="img"
                  aria-label={`Ruleta con ${available.length} opciones disponibles`}
                >
                  {available.length === 1 ? (
                    <circle
                      cx="200"
                      cy="200"
                      r="188"
                      fill={
                        available[0].kind === "wishlist"
                          ? WISHLIST_SLICE_COLORS[0]
                          : SLICE_COLORS[0]
                      }
                      stroke="#fff7e8"
                      strokeWidth="2"
                    />
                  ) : (
                    available.map((recipe, index) => (
                      <path
                        key={itemKey(recipe)}
                        d={sectorPath(index, available.length)}
                        fill={
                          recipe.kind === "wishlist"
                            ? WISHLIST_SLICE_COLORS[
                                index % WISHLIST_SLICE_COLORS.length
                              ]
                            : SLICE_COLORS[index % SLICE_COLORS.length]
                        }
                        stroke="#fff7e8"
                        strokeWidth={available.length > 20 ? 1 : 2}
                      />
                    ))
                  )}

                  {available.map((recipe, index) => {
                    const centerAngle = index * sliceAngle + sliceAngle / 2;
                    const label = polarToCartesian(centerAngle, labelRadius);
                    const lightSlice =
                      recipe.kind === "recipe" &&
                      [1, 4, 6].includes(index % SLICE_COLORS.length);
                    const readableAngle =
                      centerAngle > 90 && centerAngle < 270
                        ? centerAngle - 90
                        : centerAngle + 90;
                    const lines = titleLines(recipe.title, available.length);
                    return (
                      <text
                        key={`label-${itemKey(recipe)}`}
                        x={label.x}
                        y={label.y}
                        fill={lightSlice ? "#341b15" : "#fffaf0"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={
                          available.length > 18
                            ? 8.5
                            : available.length > 11
                              ? 10
                              : 12
                        }
                        fontWeight="800"
                        transform={`rotate(${readableAngle} ${label.x} ${label.y})`}
                        className="select-none"
                      >
                        {lines.map((line, lineIndex) => (
                          <tspan
                            key={`${itemKey(recipe)}-${lineIndex}`}
                            x={label.x}
                            dy={lineIndex === 0 ? (lines.length > 1 ? "-0.55em" : "0") : "1.15em"}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    );
                  })}
                </svg>
              </div>

              <button
                type="button"
                onClick={() => spin()}
                disabled={isSpinning || available.length < 2}
                className="roulette-center absolute left-1/2 top-1/2 z-20 flex size-[24%] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full font-bold text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-80"
                aria-label={
                  isSpinning ? "La ruleta está girando" : "Girar la ruleta"
                }
              >
                <RotateCw
                  className={`size-6 sm:size-8 ${isSpinning ? "animate-spin" : ""}`}
                />
                <span className="mt-1 text-[10px] uppercase tracking-[0.12em] sm:text-sm">
                  {isSpinning ? "Girando" : "Girar"}
                </span>
              </button>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card/90 p-6 shadow-lg shadow-accent/5 backdrop-blur-sm">
            <div>
              <span className="font-heading text-5xl font-bold text-primary">
                {available.length}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                opciones en juego
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
                {includeRecipes && (
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" />
                    {filteredRecipes.length} con receta
                  </span>
                )}
                {includeWishlist && (
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#315d69]" />
                    {wishlistItems.length} por cocinar
                  </span>
                )}
              </div>
            </div>

            <div className="my-6 h-px bg-border" />

            <RecipeFiltersComponent
              filters={filters}
              onFiltersChange={updateFilters}
              compact
              disabled={isSpinning}
            />

            <div className="my-6 h-px bg-border" />

            <div>
              <p className="font-heading text-sm font-bold text-foreground">
                Tipos de receta:
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <label
                  htmlFor="include-recipes"
                  className="flex cursor-pointer items-start gap-2.5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
                >
                  <Checkbox
                    id="include-recipes"
                    checked={includeRecipes}
                    onCheckedChange={(checked) =>
                      updateRecipeVisibility(checked === true)
                    }
                    disabled={isSpinning}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      Recetas originales
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Platos con receta.
                    </span>
                  </span>
                </label>

                <label
                  htmlFor="include-wishlist"
                  className="flex cursor-pointer items-start gap-2.5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
                >
                  <Checkbox
                    id="include-wishlist"
                    checked={includeWishlist}
                    onCheckedChange={(checked) =>
                      updateWishlistVisibility(checked === true)
                    }
                    disabled={isSpinning}
                    className="mt-0.5 border-[#315d69]/50 data-[state=checked]:border-[#315d69] data-[state=checked]:bg-[#315d69]"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      Wishlist
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Ideas que todavía no cociné / no subí receta.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="my-6 h-px bg-border" />

            <div className="flex items-end justify-between">
              {removedCount > 0 && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {removedCount}{" "}
                  {removedCount === 1 ? "descartada" : "descartadas"}
                </span>
              )}
            </div>

            {available.length === 1 && (
              <div
                role="alert"
                className="mt-5 flex gap-3 rounded-2xl border border-primary/25 bg-primary/8 p-4 text-sm text-foreground"
              >
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-primary" />
                <p>
                  <strong>Hace falta otra opción.</strong>
                  <br />
                  Una ruleta no puede girar con una única opción. Cambiá los
                  filtros o restaurá las descartadas.
                </p>
              </div>
            )}

            {available.length === 0 && (
              <div
                role="alert"
                className="mt-5 flex gap-3 rounded-2xl border border-primary/25 bg-primary/8 p-4 text-sm text-foreground"
              >
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-primary" />
                <p>
                  <strong>
                    {hasEnabledSource
                      ? "No quedaron opciones."
                      : "Elegí qué incluir."}
                  </strong>
                  <br />
                  {hasEnabledSource
                    ? "Probá cambiando los filtros, activando otra fuente o restaurando las opciones descartadas."
                    : "Activá Recetas originales, Wishlist o ambas para armar la ruleta."}
                </p>
              </div>
            )}

            <Button
              size="lg"
              className="mt-6 h-12 w-full rounded-xl text-base shadow-md"
              onClick={() => spin()}
              disabled={isSpinning || available.length < 2}
            >
              <RotateCw className={isSpinning ? "animate-spin" : ""} />
              {isSpinning ? "La suerte está girando…" : "Girar la ruleta"}
            </Button>

            {removedCount > 0 && (
              <Button
                variant="ghost"
                className="mt-2 w-full"
                onClick={restoreDiscarded}
                disabled={isSpinning}
              >
                <RefreshCcw /> Restaurar todas
              </Button>
            )}
          </aside>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="overflow-visible border-none bg-transparent p-0 shadow-none sm:max-w-xl [&_[data-slot=dialog-close]]:right-3 [&_[data-slot=dialog-close]]:top-3 [&_[data-slot=dialog-close]]:z-40 [&_[data-slot=dialog-close]]:flex [&_[data-slot=dialog-close]]:size-10 [&_[data-slot=dialog-close]]:cursor-pointer [&_[data-slot=dialog-close]]:items-center [&_[data-slot=dialog-close]]:justify-center [&_[data-slot=dialog-close]]:rounded-lg [&_[data-slot=dialog-close]]:border [&_[data-slot=dialog-close]]:border-white/70 [&_[data-slot=dialog-close]]:bg-card [&_[data-slot=dialog-close]]:text-foreground [&_[data-slot=dialog-close]]:opacity-100 [&_[data-slot=dialog-close]]:shadow-lg [&_[data-slot=dialog-close]]:hover:bg-secondary">
          {winner && (
            <>
              <div className="roulette-confetti" aria-hidden="true">
                {Array.from({ length: 28 }, (_, index) => {
                  const side = index % 4;
                  const position = `${4 + ((index * 31) % 92)}%`;
                  return (
                    <span
                      key={index}
                      className={`roulette-confetti-${["top", "right", "bottom", "left"][side]}`}
                      style={{
                        ...(side % 2 === 0 ? { left: position } : { top: position }),
                        animationDelay: `${(index % 7) * 0.035}s`,
                        animationDuration: `${0.75 + (index % 4) * 0.09}s`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="overflow-hidden rounded-lg bg-card shadow-2xl">
                <div
                  className={`relative h-52 overflow-hidden sm:h-60 ${
                    winner.kind === "wishlist" ? "bg-[#315d69]" : "bg-secondary"
                  }`}
                >
                  {winner.kind === "recipe" && winner.imagen_url ? (
                    <img
                      src={winner.imagen_url}
                      alt={winner.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="pattern-bg-subtle flex h-full flex-col items-center justify-center">
                      {winner.kind === "wishlist" ? (
                        <>
                          <Lightbulb className="relative z-10 size-16 text-[#f7e1a7]" />
                          <span className="relative z-10 mt-3 rounded-full border border-white/20 bg-black/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white">
                            Idea para receta futura
                          </span>
                        </>
                      ) : (
                        <ChefHat className="relative z-10 size-16 text-primary/55" />
                      )}
                    </div>
                  )}
                  </div>

                <div className="p-6 sm:p-7">
                <DialogHeader>
                  <DialogTitle className="pr-8 font-heading text-3xl font-bold leading-tight text-foreground">
                    {winner.title}
                  </DialogTitle>
                  <DialogDescription
                    className={`pt-1 text-sm leading-relaxed ${
                      winner.kind === "recipe" ? "line-clamp-2" : ""
                    }`}
                  >
                    {winner.description}
                  </DialogDescription>
                </DialogHeader>

                {winner.kind === "recipe" ? (
                  <>
                    <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-4">
                      <DifficultyBadge
                        difficulty={winner.difficulty as "Baja" | "Media" | "Alta"}
                        size="sm"
                      />
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                        <Clock3 className="size-4 text-primary" />{" "}
                        {winner.totalTime} min
                      </span>
                      <StarRating rating={winner.ricor} size="sm" />
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="mt-5 h-12 w-full rounded-xl text-base"
                    >
                      <Link href={`/recetas/${winner.slug}`}>
                        Ver esta receta <ArrowRight />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <div className="mt-5 flex gap-3 rounded-2xl border border-[#315d69]/20 bg-[#315d69]/8 p-4">                    <div>

                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Todavía no hay una receta cargada para este plato, pero
                        ya está en la lista de próximas ideas.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Button
                    variant="secondary"
                    className="h-11 rounded-xl"
                    onClick={spinAgain}
                  >
                    <RotateCw /> Girar otra vez
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl"
                    onClick={removeWinnerFromRoulette}
                  >
                    Eliminar de la ruleta
                  </Button>
                </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
