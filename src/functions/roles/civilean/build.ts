export function build(creep: Creep) {
  // target equals the closest structure to build
  const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (target) {
    creep.memory.target = target;
    if (creep.build(target) === ERR_NOT_IN_RANGE) {
      creep.memory.status = 3;
    }
  }
}
