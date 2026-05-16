import { RecipeEditor } from "@/src/components/recipe-editor";
import prisma from "@/src/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const recipe = await prisma.receta.findUnique({
    where: { id },
  });

  if (!recipe) {
    return notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <RecipeEditor recipe={recipe} />
      </main>
    </>
  );
}
