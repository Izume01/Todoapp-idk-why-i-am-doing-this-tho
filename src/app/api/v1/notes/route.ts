import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { todoSchema, todoUpdateSchema } from "@/lib/schema/todoSchema";

// Get all todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// Create a new todo
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid data", errors: parsed.error.format() },
      { status: 422 }
    );
  }
  try {
    const todo = await prisma.todo.create({ data: parsed.data });
    return NextResponse.json(todo, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create todo" },
      { status: 500 }
    );
  }
}

// Update todo
export async function PUT(req: NextRequest) {
  const { id, title, description, completed } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "ID is required" },
      { status: 400 }
    );
  }

  const parsed = todoUpdateSchema.safeParse({
    title,
    description,
    completed,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid data", errors: parsed.error.format() },
      { status: 422 }
    );
  }

  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(todo, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
}
