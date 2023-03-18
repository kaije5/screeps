import { harvest } from "./harvest";
import { builder } from "./builder";
import { upgrader } from "./upgrader";
import { repairer } from "./repairer";
import { mover } from "./mover";

export function run(creep: Creep) {
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

        default:
          break;
      }
}
