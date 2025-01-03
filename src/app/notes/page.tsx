import React from "react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db/prisma";
import Note from "@/components/Note";

export const metaData: Metadata = {
  title: "FlowBrain - Notes",
};

export default async function NotePage() {
  const { userId } = await auth();
  if (!userId) throw Error("userId undefined...");
  const allNotes = await prisma.note.findMany({ where: { userId } });

  return (
    <div className="grid gap-3  lg:grid-cols-3 sm:grid-cols-2">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {
        allNotes.length === 0 && (
          <div className="col-span-full text-center">
            {"You don't have any notes yet!"}
          </div>
        )
      }
    </div>
  );
}
