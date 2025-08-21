import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

//  Get a single Route using the fuckuing GET Req 
export async function POST(req: NextRequest , {params} : {params : {id : number}}) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "No id found" }, { status: 400 });
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: "No todo Found" }, { status: 404 });
    }
    return NextResponse.json({ todo: todo }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
