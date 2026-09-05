import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/src/auth";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado, inicie sesión" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.receta.delete({
      where: { id },
    });

    revalidatePath("/recetas");
    revalidatePath("/que-como-hoy");
    revalidatePath("/admin/panel");
    revalidatePath(`/admin/editor/${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Error al eliminar la receta" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado, inicie sesión" }, { status: 401 });
    }

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

    revalidatePath("/recetas");
    revalidatePath("/que-como-hoy");
    revalidatePath(`/recetas/${recipe.slug}`); 
    revalidatePath("/admin/panel");
    revalidatePath(`/admin/editor/${id}`);

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Error al actualizar la receta" },
      { status: 500 }
    );
  }
}
