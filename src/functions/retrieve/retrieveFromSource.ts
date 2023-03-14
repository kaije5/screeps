export function retrieveFromSource(creep: Creep) {
  //if creep is trying to build but has no energy left
  const creepCarrying = creep.store.getUsedCapacity();
  const creepCarryingCapacity = creep.store.getCapacity();
  if (creepCarrying < creepCarryingCapacity) {
    //retrieve energy
    try {
      retrieveFromSource(creep);
    } catch (e) {
      console.log(e);
    }
  }
}
