export function repair(creep: Creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax
    });

    targets.sort((a,b) => a.hits - b.hits);

    if(targets.length > 0) {
        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
}
