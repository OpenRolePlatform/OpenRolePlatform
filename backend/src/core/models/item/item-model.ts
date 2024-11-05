import { Damage } from "../damage-model";

export interface Item {
  owner: String;
  name: String;
  description: String;
  equipable: boolean;
  equipped: boolean;
  type: String;
  bonus: Number;
  damage: Damage;
  hidden: boolean;
}
