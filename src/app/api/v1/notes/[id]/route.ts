import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { todoSchema } from "@/lib/schema/todoSchema";

// Get todo by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to fetch todo" }, { status: 500 });
  }
}

// Update todo by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();
  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid data", errors: parsed.error.format() }, { status: 422 });
  }
  try {
    const todo = await prisma.todo.update({ where: { id }, data: parsed.data });
    return NextResponse.json(todo, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to update todo" }, { status: 500 });
  }
}

// Delete todo by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  try {
    const todo = await prisma.todo.delete({ where: { id } });
    return NextResponse.json(todo, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to delete todo" }, { status: 500 });
  }
}
