import { depositInStructure } from "functions/energy/depositInStructure";
import { retrieveFromHarvester } from "functions/energy/retrieveFromHarvester";

export function mover(creep: Creep) {
  if (creep.memory.working === true) {
    depositInStructure(creep)
  }

  if(creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    creep.memory.working = true
    depositInStructure(creep)
  } else if (creep.memory.working === false) {
    retrieveFromHarvester(creep)
  } else if (creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false
  }
}
