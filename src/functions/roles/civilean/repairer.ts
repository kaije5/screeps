import { retrieveFromHarvester } from "functions/energy/retrieveFromHarvester"
import { repair } from "./work/repair"

export function repairer(creep: Creep) {
  if (creep.memory.working === true) {
    repair(creep)
  }
  if(creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    creep.memory.working = true
    repair(creep)
  } else if (creep.memory.working === false) {
    retrieveFromHarvester(creep)
  } else if (creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false
  }
}
