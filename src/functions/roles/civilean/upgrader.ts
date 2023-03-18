import { retrieveFromHarvester } from "functions/energy/retrieveFromHarvester"
import { upgrade } from "./work/upgrade"

export function upgrader(creep: Creep) {
  if (creep.memory.working === true) {
    upgrade(creep)
  }
  if(creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    creep.memory.working = true
    upgrade(creep)
  } else if (creep.memory.working === false) {
    retrieveFromHarvester(creep)
  } else if (creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false
  }
}
