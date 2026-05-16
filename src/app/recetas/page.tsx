import React from 'react';
import { RecipeGrid } from '@/src/components/recipe-grid';
import prisma from '@/src/lib/prisma';

const page = async () => {
  try {
    // Obtener recetas desde Neon vía Prisma
    const recipes = await prisma.receta.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return (
      <section id="recipes">
        <RecipeGrid recipes={recipes} />
      </section>
    );
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    return (
      <div className="py-12 text-center text-destructive">
        Error al cargar las recetas
      </div>
    );
  }
};

export default page;