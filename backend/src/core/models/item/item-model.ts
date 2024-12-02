import { Damage } from "../damage-model";

export interface Item {
  name: string;
  owner?: string;
  description: string;
  equipable: boolean;
  equipped?: boolean;
  type: string;
  bonus: number;
  damage: Damage;
  hidden?: boolean;
  image?: string;
}
