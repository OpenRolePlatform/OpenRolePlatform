import { Spell } from '@prisma/client';
import { SpellInput } from '../validation/zod-schemas';

export const SpellAdapter = {
  toFrontend: (spell: Spell) => {
    const systemData = spell.systemData as any;
    return {
      _id: spell.id,
      name: spell.name,
      description: spell.description || "",
      class: spell.class,
      level: spell.level,
      school: spell.school,
      ...systemData
    };
  },

  toDatabase: <T extends Partial<SpellInput>>(input: T) => {
    const {
      name, description, class: className, level, school,
      ...systemData
    } = input as SpellInput;

    return {
      meta: {
        name: name as T['name'],
        description,
        class: className as T['class'],
        level: level as T['level'],
        school: school as T['school']
      },
      systemData
    };
  }
};
