export function depositInStructure(creep: Creep) {
    //deposit to the closest structure
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      // filter for extensions and spawns that are not full
      filter: (structure) => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
    // if target is found and is not full, deposit energy
    if (target) {
        //if target is a structure, deposit energy in it
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //move to target
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else if (creep.store.getUsedCapacity() === 0) {
      creep.memory.working = false;
  }
}
