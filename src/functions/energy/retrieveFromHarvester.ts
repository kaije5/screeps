// Define a function to find the nearest dropped energy unit that exceeds the creep's capacity.
function findDroppedEnergy(creep: Creep): Resource | null {

  const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
    filter: (resource) => resource.resourceType === RESOURCE_ENERGY,
  });

  console.log("Dropped energy: " + droppedEnergy.length)

  if (droppedEnergy.length > 0) {
    return creep.pos.findClosestByPath(droppedEnergy);
  } else {
    return null;
  }
}

//move to target harvester creep and retrieve energy from it
export function retrieveFromHarvester(creep: Creep) {
  let target = findDroppedEnergy(creep);

  if (target) {
    if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
}
