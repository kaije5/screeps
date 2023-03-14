export function build(creep: Creep) {
  //build nearby construction sites
  let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    //if target is a construction site, build it
    if (target instanceof ConstructionSite) {
      if (creep.build(target) === ERR_NOT_IN_RANGE) {
        creep.memory.status = 3;
      }
    }
}
