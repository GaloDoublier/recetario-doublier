import { RecipeDetail } from "@/src/components/recipe-detail";
import prisma from '@/src/lib/prisma'; // Asegúrate de que esta ruta apunte a tu lib/prisma.ts
import { notFound } from "next/navigation";

export default async function RecipePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params; 

  const recipe = await prisma.receta.findUnique({
    where: { slug }, // 3. Le decimos a Prisma que busque por slug
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