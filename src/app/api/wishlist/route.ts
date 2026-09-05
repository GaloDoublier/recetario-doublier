import { auth } from "@/src/auth";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 280;

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "No autorizado, inicie sesión" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";

    if (!title || !description) {
      return NextResponse.json(
        { error: "El nombre y la descripción son obligatorios" },
        { status: 400 },
      );
    }

    if (
      title.length > TITLE_MAX_LENGTH ||
      description.length > DESCRIPTION_MAX_LENGTH
    ) {
      return NextResponse.json(
        { error: "El nombre o la descripción superan el largo permitido" },
        { status: 400 },
      );
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: { title, description },
      select: { id: true, title: true, description: true },
    });

    revalidatePath("/admin/panel");
    revalidatePath("/que-como-hoy");

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error("Error creating wishlist item:", error);
    return NextResponse.json(
      { error: "No se pudo agregar la idea a la wishlist" },
      { status: 500 },
    );
  }
}
