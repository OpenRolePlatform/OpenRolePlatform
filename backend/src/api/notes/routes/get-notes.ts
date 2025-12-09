import { prisma } from "../../../connectDB";
import { NoteAdapter } from "../../../core/adapters/note-adapter";

export const _getNotes = async (ownerId: string) => {
  const notes = await prisma.note.findMany({
    where: { playerId: ownerId },
    orderBy: { updatedAt: 'desc' }
  });

  return notes.map(NoteAdapter.toFrontend);
};
