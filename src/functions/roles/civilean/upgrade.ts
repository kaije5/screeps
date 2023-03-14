import { retrieveFromSource } from "functions/retrieve/retrieveFromSource";

export function upgrade(creep: Creep) {
  const target = creep.room.controller;
  if (target) {
    creep.memory.target = target;
    if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
      creep.memory.status = 3;
    }
  }
}
