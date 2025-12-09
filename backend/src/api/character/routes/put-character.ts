import { prisma } from "../../../connectDB";
import { CharacterAdapter } from "../../../core/adapters/character-adapter";
import { CharacterInputSchema } from "../../../core/validation/zod-schemas";

export const _putCharacter = async (id: string, data: any) => {
  const validatedData = CharacterInputSchema.partial().parse(data);

  const existingChar = await prisma.character.findUnique({ where: { id } });
  if (!existingChar) return null;

  const { meta, sheet: newSheet } = CharacterAdapter.toDatabase(validatedData);
  const currentSheet = existingChar.sheetData as any;

  const mergedSheet = { ...currentSheet, ...newSheet };

  const updatedChar = await prisma.character.update({
    where: { id },
    data: {
      ...meta,
      sheetData: mergedSheet
    },
    include: {
      inventory: { include: { item: true } },
      spellbook: { include: { spell: true } }
    }
  });

  return CharacterAdapter.toFrontend(updatedChar);
};
