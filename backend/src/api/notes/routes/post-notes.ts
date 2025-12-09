import { prisma } from "../../../connectDB";
import { NoteAdapter } from "../../../core/adapters/note-adapter";
import { NoteInputSchema } from "../../../core/validation/zod-schemas";

export const _postNotes = async (ownerId: string, data: any) => {
  const validated = NoteInputSchema.pick({ text: true }).parse(data);

  const newNote = await prisma.note.create({
    data: {
      text: validated.text,
      player: { connect: { id: ownerId } }
    }
  });

  return NoteAdapter.toFrontend(newNote);
};
