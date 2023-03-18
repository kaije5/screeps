export function upgrade(creep: Creep) {
    //upgrade the controller
    let target = creep.room.controller;
    if (target) {
        if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}
