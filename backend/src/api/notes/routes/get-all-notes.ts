import { prisma } from "../../../connectDB";
import { NoteAdapter } from "../../../core/adapters/note-adapter";

export const _getAllNotes = async () => {
  const notes = await prisma.note.findMany({
    orderBy: { updatedAt: 'desc' }
  });

  return notes.map(NoteAdapter.toFrontend);
};
