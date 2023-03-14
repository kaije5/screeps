export function upgrade(creep: Creep) {
    //upgrade the controller
    let target = creep.room.controller;
    if (target) {
        //if target is a construction site, build it
        if (target instanceof StructureController) {
            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                creep.memory.status = 3;
            }
        }
    } else {
        creep.memory.status = 5;
    }
}
