import type { Metadata } from "next";
import prisma from "@/src/lib/prisma";
import { RecipeRoulette } from "@/src/components/recipe-roulette";

export const metadata: Metadata = {
  title: "¿Qué como hoy? | Recetario-Doublier",
  description: "Dejá que la ruleta elija tu próxima receta casera.",
};

export default async function QueComoHoyPage() {
  try {
    const recipes = await prisma.receta.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        difficulty: true,
        totalTime: true,
        ricor: true,
        imagen_url: true,
      },
      orderBy: { title: "asc" },
    });

    return <RecipeRoulette recipes={recipes} />;
  } catch (error) {
    console.error("Error al cargar la ruleta de recetas:", error);

    return (
      <section className="pattern-bg min-h-[75vh]">
        <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center bg-background px-4 text-center">
          <div>
            <span className="text-5xl" aria-hidden="true">🍳-🍳</span>
            <h1 className="mt-5 font-heading text-3xl font-bold">Se me quemó todo</h1>
            <p className="mt-3 text-muted-foreground">Por algun motivo esta pagina no cargo, si tengo tiempo lo arreglo.</p>
          </div>
        </div>
      </section>
    );
  }
}
