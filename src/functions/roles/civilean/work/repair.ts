export function repair(creep: Creep) {
    //repair the nearest damaged structure
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES);
    if (target) {
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}
