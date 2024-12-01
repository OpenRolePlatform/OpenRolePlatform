import { Damage } from "../damage-model";

export interface Item {
  owner: string;
  name: string;
  description: string;
  equipable: boolean;
  equipped: boolean;
  type: string;
  bonus: number;
  damage: Damage;
  hidden: boolean;
}
