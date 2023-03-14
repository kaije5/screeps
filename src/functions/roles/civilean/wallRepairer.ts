export function wallRepair(creep: Creep) {
    //repair the nearest damaged structure
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType === STRUCTURE_RAMPART &&
                structure.hits < structure.hitsMax
            );
        },
    });

    if (target) {
        //if target is a construction site, build it
        if (target instanceof Structure) {
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.memory.status = 3;
            }
        }
    } else {
        creep.memory.status = 5;
    }
}
