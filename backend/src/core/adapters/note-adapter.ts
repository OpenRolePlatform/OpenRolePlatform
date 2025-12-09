import { Note } from '@prisma/client';

export const NoteAdapter = {
  toFrontend: (note: Note) => ({
    _id: note.id,
    text: note.text,
    playerId: note.playerId,
  }),

  toDatabase: (input: any) => ({
    text: input.text,
  })
};
