import { findClosestContainerWithSpace } from "../find/findClosestContainer";
import { findClosestStorageWithSpace } from "../find/findClosestStorage";

export function putInStorageContainer(creep: Creep) {
  const storage = findClosestStorageWithSpace(creep.pos);
  const container = findClosestContainerWithSpace(creep.pos);
  if (storage) {
    if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      console.log(creep.name + " Moving to storage: " + storage.id)
        creep.moveTo(storage, { visualizePathStyle: { stroke: "#e0ff00" } });
    }
  } else if (container) {
    if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(container, { visualizePathStyle: { stroke: "#e0ff00" } });
    }
  } else {
    // If there is no storage or container set status to
    creep.memory.status = 2;
  }
}
