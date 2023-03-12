import { findClosestContainerWithSpace } from "./findClosestContainer";
import { findClosestStorageWithSpace } from "./findClosestStorage";
import { putInStructure } from "./putInStructure";

export function putInStorageContainer(creep: Creep) {
  const storage = findClosestStorageWithSpace(creep.pos);
  const container = findClosestContainerWithSpace(creep.pos);
  if (storage) {
    if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  } else if (container) {
    if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(container, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  } else {
    // If there is no storage or container call the putInStructure function
    putInStructure(creep);
  }
}
