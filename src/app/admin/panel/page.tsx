import { AdminPanel } from "@/src/components/admin-panel";
import prisma from "@/src/lib/prisma";

export default async function AdminPanelPage() {
  const recetas = await prisma.receta.findMany({
    orderBy: { createdAt: "desc" },
  });

  const recipes = recetas.map((r) => ({
    id: r.id,
    slug: r.title.toLowerCase().replace(/\s+/g, "-"),
    title: r.title,
    description: r.description,
    difficulty: r.difficulty as "Baja" | "Media" | "Alta",
    ricor: r.ricor,
    imageUrl: r.imagen_url ?? undefined,
    ingredients: [],
    steps: [],
    totalTime: r.totalTime,
    content: r.contenido_markdown,
  }));

  return (
    <>
      <main className="min-h-screen bg-background">
        <AdminPanel recipes={recipes} />
      </main>
    </>
  );
}