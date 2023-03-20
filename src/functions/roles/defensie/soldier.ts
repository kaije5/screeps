import { attacker } from "./attacker";
import { claimer } from "./claimer";
import { defender } from "./defender";


export function runDef(creep: Creep) {
  //if creep has enough energy, switch to working state
  // if (creep.memory.working == true && creep.store[RESOURCE_ENERGY] == 0) {
    switch (creep.memory.role) {
        case "defender":
            //creep.say("defender")
            defender(creep);
            break;
        case "claimer":
            //creep.say("claimer")
            claimer(creep);
            break;
            case "attacker":
            //creep.say("attacker")
            attacker(creep);
            break;
        default:
          break;
      }
  //else creep is still gathering energy

}
