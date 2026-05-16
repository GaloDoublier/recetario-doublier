import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, difficulty, totalTime, ricor, imagen_url, contenido_markdown } = body;

    if (!title || !description || !difficulty || !contenido_markdown) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const recipe = await prisma.receta.create({
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

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Error al crear la receta" },
      { status: 500 }
    );
  }
}
