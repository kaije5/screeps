import { retrieveFromSource } from "functions/retrieve/retrieveFromSource";

export function repair(creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        structure.hits < structure.hitsMax &&
        structure.structureType !== STRUCTURE_WALL
      );
    },
  });
  if (target) {
    creep.memory.target = target;
    if (creep.repair(target) === ERR_NOT_IN_RANGE) {
      creep.memory.status = 3;
    }
  }
}
