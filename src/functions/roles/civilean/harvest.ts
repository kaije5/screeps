export function harvest(creep: Creep) {
  // if creep is not a full capacity, harvest energy
  if (creep.store.getFreeCapacity() > 0) {
    //get the closest source and set it as target
    let target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (target) {
      if (target instanceof Source) {
        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
      }
    }
  } else {
    //if creep is full, change status to request status
    creep.memory.status = 5;
  }
}

export function deposit(creep: Creep) {
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
        creep.memory.status = 3;
    }
  // else if target is found and is full,
  } else {
    creep.memory.target = {};
    creep.memory.status = 5;
  }
}
