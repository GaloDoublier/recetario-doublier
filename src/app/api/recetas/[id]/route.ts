import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { title, description, difficulty, totalTime, ricor, imagen_url, contenido_markdown } = body;

    if (!title || !description || !difficulty || !contenido_markdown) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const recipe = await prisma.receta.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        totalTime: Number(totalTime),
        ricor: Number(ricor),
        imagen_url: imagen_url || null,
        contenido_markdown,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Error al actualizar la receta" },
      { status: 500 }
    );
  }
}
