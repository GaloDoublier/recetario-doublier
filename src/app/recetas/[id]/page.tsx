import { RecipeDetail } from "@/src/components/recipe-detail";
import prisma from '@/src/lib/prisma'; // Asegúrate de que esta ruta apunte a tu lib/prisma.ts
import { notFound } from "next/navigation";

export default async function RecipePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. En Next.js 15, debemos resolver la promesa de params
  const { id } = await params;

  // 2. Buscar en Neon vía Prisma
  const recipe = await prisma.receta.findUnique({
    where: { id },
  });

  if (!recipe) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <RecipeDetail recipe={recipe} />
    </main>
  );
}