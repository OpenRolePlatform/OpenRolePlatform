import { prisma } from "../../../connectDB";
import { NoteAdapter } from "../../../core/adapters/note-adapter";

export const _putNotes = async (playerId: string, data: any) => {

  const existingNote = await prisma.note.findFirst({
    where: { playerId: playerId }
  });

  if (existingNote) {
    const updated = await prisma.note.update({
      where: { id: existingNote.id },
      data: { text: data.text }
    });
    return NoteAdapter.toFrontend(updated);
  } else {
    const newNote = await prisma.note.create({
      data: {
        text: data.text,
        playerId: playerId
      }
    });
    return NoteAdapter.toFrontend(newNote);
  }
};
