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

export function AssignUpgradeController(creep: Creep) {
  const target = creep.room.controller;
  if (target) {
    creep.memory.target = target;
    creep.memory.status = 3;
  }
}
