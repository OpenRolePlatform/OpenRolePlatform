import { Damage } from "../damage-model";

export interface Spell {
  owner: String;
  name: String;
  class: String;
  level: Number;
  school: String;
  casting_time: Number;
  duration: Number;
  range: Number;
  shape: String;
  components: {
    verbal: boolean;
    somatic: boolean;
    material: boolean;
  };
  description: String;
  equipable: boolean;
  equipped: boolean;
  type: String;
  bonus: Number;
  damage: Damage;
  hidden: boolean;
}
