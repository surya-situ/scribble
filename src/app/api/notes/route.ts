import { index } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const embedding = await getEmbedding(title, content);

    if (!embedding) {
      return Response.json({
        error: "Failed to generate embeddings due to quota limitations.",
      });
    }

    // ! ONLY CHATGPT KNOWS HOW THIS LOGIC WORKS 
    // ! DO NOT CHANGE THIS AS YOU HAVE TO CHANGE THE PINECONE CONFIGs...
    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          content,
          userId,
        },
      })

      await index.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: {userId}
        }
      ]);

      return note;
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, title, content } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const { userId } = await auth();

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return Response.json({ updateNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const { userId } = await auth();

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.note.delete({ where: { id } });

    return Response.json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
  return getEmbedding(title, content);
}
