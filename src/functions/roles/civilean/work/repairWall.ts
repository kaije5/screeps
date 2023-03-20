export function repairWall(creep: Creep): void {
    //deposit to the closest structure
    const targets = creep.room.find(FIND_STRUCTURES, {
      // filter for extensions and spawns that are not full
      filter: (structure) => {
        return (
          (structure.structureType === STRUCTURE_WALL ||
            structure.structureType === STRUCTURE_RAMPART ||
            structure.structureType === STRUCTURE_TOWER) &&
            structure.hits < structure.hitsMax
        );
      },
    });

    if(targets.length > 0) {
      if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
      }
  }
}
