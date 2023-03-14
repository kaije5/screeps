export function claimer(creep: Creep) {
  const target = creep.room.controller;
  if (target) {
    if (creep.claimController(target) === ERR_NOT_IN_RANGE) {
      console.log(creep.name + " Moving to controller: " + target.id)
      creep.moveTo(target, { visualizePathStyle: { stroke: "#468468" } });
    }
  }
}
