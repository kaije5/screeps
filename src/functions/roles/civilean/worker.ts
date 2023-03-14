import { deposit, harvest } from "./harvest";
import { build } from "./build";
import { upgrade } from "./upgrade";
import { repair } from "./repair";
import { wallRepair } from "./wallRepairer";

export function run(creep: Creep) {
    switch (creep.memory.role) {
        case "harvester":
          //creep.say("harvester")
          deposit(creep);
          break;
        case "builder":
          //creep.say("builder")
          build(creep);
          break;
        case "upgrader":
          //creep.say("upgrader")
          upgrade(creep);
          break;
        case "repairer":
          //creep.say("repairer")
          repair(creep);
          break;
        case "wall_repairer":
          //creep.say("wall_repairer")
          wallRepair(creep);
          break;

        default:
          creep.memory.status = 5;
          break;
      }
}
