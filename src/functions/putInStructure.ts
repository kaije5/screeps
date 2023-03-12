export function putInStructure(creep: Creep) {
    // If the creep is not currently harvesting, it will try to find the closest structure that needs energy and deposit its energy there
    const targets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      const closestTarget = creep.pos.findClosestByPath(targets);
      if (closestTarget && creep.store.getUsedCapacity() > 0) {
        if (creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(closestTarget, { visualizePathStyle: { stroke: "#ffffff" } });
        } else if (creep.store.getUsedCapacity() === 0) {
          creep.memory.jobState = 1;
        }
      }
}
