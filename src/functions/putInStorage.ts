export function putInStorage(creep: Creep) {
  const storage = creep.room.storage;
  if (storage) {
    if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
}
