export function harvest(creep: Creep) {
// move to target source
let target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
if (target) {
    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
}
