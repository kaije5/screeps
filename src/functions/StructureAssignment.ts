export function AssignBuildStructure(creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (target) {
    creep.memory.target = target;
    creep.memory.status = 3;
  }
}

export function AssignRepairStructure(creep: Creep) {
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
    creep.memory.status = 3;
  }
}

export function AssignWallRepairStructure(creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        structure.hits < structure.hitsMax &&
        structure.structureType === STRUCTURE_WALL
      );
    },
  });
  if (target) {
    creep.memory.target = target;
    creep.memory.status = 3;
  }
}

export function AssignHarvestSource(creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (target) {
    creep.memory.target = target;
    creep.memory.status = 3;
  }
}

export function assignDepositStructure(creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
    creep.memory.target = target;
    creep.memory.status = 3;
  }
}

export function AssignUpgradeController(creep: Creep) {
  const target = creep.room.controller;
  if (target) {
    creep.memory.target = target;
    creep.memory.status = 3;
  }
}
