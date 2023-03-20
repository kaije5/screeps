import { retrieveFromHarvester } from "functions/energy/retrieveFromHarvester"
import { repairWall } from "./work/repairWall"

export function repairer(creep: Creep) {
  if (creep.memory.working === true) {
    repairWall(creep)
  }
  if(creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    creep.memory.working = true
    repairWall(creep)
  } else if (creep.memory.working === false) {
    retrieveFromHarvester(creep)
  } else if (creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false
  }
}
