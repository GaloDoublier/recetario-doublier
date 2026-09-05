import { auth } from "@/src/auth";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "No autorizado, inicie sesión" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await prisma.wishlistItem.delete({ where: { id } });

    revalidatePath("/admin/panel");
    revalidatePath("/que-como-hoy");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar la idea de la wishlist" },
      { status: 500 },
    );
  }
}
