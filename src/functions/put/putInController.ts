export function putInController(creep: Creep) {
  const controller = creep.room.controller;
  if (controller && creep.store.getUsedCapacity() > 0) {
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      console.log(creep.name + " Moving to controller: " + controller.id)
      provider {
        creep.moveTo(controller, { visualizePathStyle: { stroke: "#e0ff00" } });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
