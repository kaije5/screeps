import { findClosestStorageWithEnergy } from "../find/findClosestStorage";
import { findClosestContainerWithEnergy } from "../find/findClosestContainer";

export function retrieveFromStorageContainer(creep: Creep) {
  // Find the closest storage  or container to retrieve energy from.
  const storage = findClosestStorageWithEnergy(creep.pos);
  const container = findClosestContainerWithEnergy(creep.pos);

  // the creep will try to find the closest storage or container and retrieve energy from it.
  if (container && creep.store.getFreeCapacity() > 0) {
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(container, { visualizePathStyle: { stroke: "#e0ff00" } });
    }
  } else if (storage && creep.store.getFreeCapacity() > 0) {
    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      console.log(creep.name + " Moving to storage: " + storage.id);
        creep.moveTo(storage, { visualizePathStyle: { stroke: "#e0ff00" } });
    }
  } else {
    // If there is no storage or container set status to 6
    creep.memory.status = 1;
  }
}
