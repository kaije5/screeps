import { putInStorageContainer } from "functions/put/putInStorageContainer";
import { retrieveFromSource } from "functions/retrieve/retrieveFromSource";

export function harvest(creep: Creep) {
    // until the creeps energy is full retrieve energy from the closest source
    if (creep.store.getUsedCapacity() < creep.store.getCapacity()) {
        retrieveFromSource(creep);
      } else
      // If the creeps energy is full put it in the closest storage or container
      if (creep.store.getFreeCapacity() === 0) {
        putInStorageContainer(creep);
      }
}
