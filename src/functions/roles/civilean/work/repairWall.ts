export function repairWall(creep: Creep): void {
  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL,
  });
  if (target) {
    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
}
