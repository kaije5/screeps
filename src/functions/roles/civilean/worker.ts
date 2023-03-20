import { harvest } from "./work/harvest";
import { builder } from "./builder";
import { upgrader } from "./upgrader";
import { repairer } from "./repairer";
import { mover } from "./mover";

export function runCiv(creep: Creep) {
  //if creep has enough energy, switch to working state
  // if (creep.memory.working == true && creep.store[RESOURCE_ENERGY] == 0) {
    switch (creep.memory.role) {
        case "harvester":
          //creep.say("harvester")
          harvest(creep);
          break;
        case "mover":
          //creep.say("mover")
          mover(creep);
          break;
        case "builder":
          //creep.say("builder")
          builder(creep);
          break;
        case "upgrader":
          //creep.say("upgrader")
          upgrader(creep);
          break;
        case "repairer":
          //creep.say("repairer")
          repairer(creep);
          break;
        case "wallRepairer":
          //creep.say("wallRepairer")
          repairer(creep);
          break;

        default:
          break;
      }
  //else creep is still gathering energy

}
