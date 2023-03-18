import { retrieveFromHarvester } from "functions/energy/retrieveFromHarvester"
import { build } from "./work/build"

export function builder(creep: Creep) {
  if (creep.memory.working === true) {
    build(creep)
  }

  if(creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    creep.memory.working = true
    build(creep)
  } else if (creep.memory.working === false) {
    retrieveFromHarvester(creep)
  } else if (creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false
  }
}
