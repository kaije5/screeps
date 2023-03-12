import { findClosestStorageWithEnergy } from "./findClosestStorage";
import { findClosestContainerWithEnergy } from "./findClosestContainer";

export function retrieveFromStorageContainer(creep: Creep) {
  // Find the closest storage  or container to retrieve energy from.
  const storage = findClosestStorageWithEnergy(creep.pos);
  const container = findClosestContainerWithEnergy(creep.pos);

  // the creep will try to find the closest storage or container and retrieve energy from it.
  if (container && creep.store.getFreeCapacity() > 0) {
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(container, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  } else if (storage && creep.store.getFreeCapacity() > 0) {
    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }
}
