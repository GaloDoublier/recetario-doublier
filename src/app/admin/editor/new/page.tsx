import { RecipeEditor } from "@/src/components/recipe-editor";

export default async function NewRecipePage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <RecipeEditor />
      </main>
    </>
  );
}