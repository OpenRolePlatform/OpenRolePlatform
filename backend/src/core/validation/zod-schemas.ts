import { z } from 'zod';

// ==========================================
// 1. HELPERS Y SUB-SCHEMAS
// ==========================================

const reqString = z.string().min(1, "Required field");
const reqNumber = z.coerce.number().default(0);
const reqBool = z.coerce.boolean().default(false);

const StatsSchema = z.object({
  strength: reqNumber.default(10),
  dexterity: reqNumber.default(10),
  constitution: reqNumber.default(10),
  intelligence: reqNumber.default(10),
  wisdom: reqNumber.default(10),
  charisma: reqNumber.default(10),
});

const HpSchema = z.object({
  hp: reqNumber,
  hpTemp: reqNumber,
  hpPool: reqNumber,
});

const OtherStatsSchema = z.object({
  ac: reqNumber,
  movement: reqNumber.default(30),
  bonus: reqNumber,
});

const DamageSchema = z.object({
  damage_type: z.string().optional(),
  damage_dice_sides: z.coerce.number().optional(),
  damage_dice_count: z.coerce.number().optional(),
  damage_addition: z.coerce.number().optional(),
});

// ==========================================
// 2. CHARACTER SCHEMA
// ==========================================

export const CharacterInputSchema = z.object({
  name: reqString,
  image: z.string().optional(),
  level: reqNumber,
  class: z.string().optional(),
  race: z.string().optional(),

  /* Relations */
  owner: z.string().optional(), //The player ID

  /* These details as JSONB because of further compatibility with other role systems */
  stats: StatsSchema,

  skills: z.object({
    strength: reqBool, dexterity: reqBool, constitution: reqBool,
    intelligence: reqBool, wisdom: reqBool, charisma: reqBool,
    acrobatics: reqBool, animal: reqBool, arcana: reqBool,
    athletics: reqBool, deception: reqBool, history: reqBool,
    insight: reqBool, intimidation: reqBool, investigation: reqBool,
    medicine: reqBool, nature: reqBool, perception: reqBool,
    performance: reqBool, persuasion: reqBool, religion: reqBool,
    hand: reqBool, stealth: reqBool, survival: reqBool,
  }).optional(), /* Optional to allow the lack of any */

  hp: HpSchema,
  other: OtherStatsSchema,

  /* Optional lists in case Frontend wants to send these in the future to directly create an initial character */
  items: z.array(z.any()).optional(),
  spells: z.array(z.any()).optional(),
});

// ==========================================
// 3. ITEM SCHEMA
// ==========================================

export const ItemInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  image: z.string().optional(),

  bonus: z.coerce.number().default(0),
  equipable: z.coerce.boolean().default(false),
  hidden: z.coerce.boolean().default(false),
  owner: z.string().optional(),

  damage: DamageSchema.optional(),

  equipped: z.coerce.boolean().default(false),
  amount: z.coerce.number().default(1),

  _id: z.string().optional(),
  instanceId: z.string().optional(),
});

// ==========================================
// 4. SPELL SCHEMA
// ==========================================

export const SpellInputSchema = z.object({
  name: reqString,
  description: z.string().optional(),
  class: reqString,
  level: reqNumber,
  school: reqString,
  /* These details as JSONB because of further compatibility with other role systems */
  casting_time: reqNumber,
  duration: reqNumber,
  range: reqNumber,
  shape: z.string().optional(),
  components: z.object({
    verbal: reqBool,
    somatic: reqBool,
    material: reqBool
  }),

  bonus: reqNumber,
  damage: DamageSchema.optional(),
  hidden: reqBool,
});

// ==========================================
// 5. CAMPAIGN & PLAYER SCHEMAS
// ==========================================
export const CampaignInputSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string().optional(),
  status: z.enum(['active', 'completed', 'paused']).default('active'),
  creator: z.string().optional(),
});

export const PlayerInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const NoteInputSchema = z.object({
  text: z.string().min(1),
  characterId: z.string().uuid(),
});

/* TypeScript type inferences exporting */
export type CharacterInput = z.infer<typeof CharacterInputSchema>;
export type ItemInput = z.infer<typeof ItemInputSchema>;
export type SpellInput = z.infer<typeof SpellInputSchema>;
export type CampaignInput = z.infer<typeof CampaignInputSchema>;
export type PlayerInput = z.infer<typeof PlayerInputSchema>;
