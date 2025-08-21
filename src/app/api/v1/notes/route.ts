import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { todoSchema } from "@/lib/schema/todoSchema";
import { todoUpdateSchema } from "@/lib/schema/todoSchema";

//  Get all todos
export async function GET() {
  try {
    const allTodos = await prisma.todo.findMany();

    if (allTodos.length === 0) {
      return NextResponse.json(
        { success: false, message: "No todos found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Todos fetched successfully", data: allTodos },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

//  Delete todo by ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedTodo = await prisma.todo.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "Todo deleted successfully",
        data: deletedTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

//  Create a new todo
export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedData = todoSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid data",
        errors: parsedData.error.format(),
      },
      { status: 422 }
    );
  }

  try {
    const createdTodo = await prisma.todo.create({
      data: parsedData.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo created successfully",
        data: createdTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, title, description, completed } = await req.json();

  const ParsedUser = todoUpdateSchema.safeParse({
    title,
    description,
    completed,
  });

  if (!ParsedUser.success) {
    return NextResponse.json(
      { success: false, message: "Invalid Data" },
      { status: 422 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );
  }

  try {
    const FoundUser = await prisma.todo.findUnique({ where: { id } });

    if (!FoundUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        ...ParsedUser.data,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully ",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update todo" },
      { status: 500 }
    );
  }
}
