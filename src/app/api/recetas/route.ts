import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/src/auth";


function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: NextRequest) {
  try {

    const sesion = await auth();
    if (!sesion) {
      return NextResponse.json(
        {error: "Acceso denegado, por favor inicie sesión"},
        {status: 401} 
      );
    }


    const body = await request.json();

    const { title, description, difficulty, totalTime, ricor, imagen_url, contenido_markdown } = body;

    if (!title || !description || !difficulty || !contenido_markdown) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const slugGenerado = slugify(title);

    const recipe = await prisma.receta.create({
      data: {
        title,
        description,
        difficulty,
        slug: slugGenerado,
        totalTime: Number(totalTime),
        ricor: Number(ricor),
        imagen_url: imagen_url || null,
        contenido_markdown,
      },
    });

    revalidatePath("/recetas");
    revalidatePath("/admin/panel");

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Error al crear la receta" },
      { status: 500 }
    );
  }
}
