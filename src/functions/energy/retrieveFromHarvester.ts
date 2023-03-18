//move to target harvester creep and retrieve energy from it
export function retrieveFromHarvester(creep: Creep) {
    let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (resource) => {
          return resource.resourceType === RESOURCE_ENERGY;
        }
      });
    if(target) {
        if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
}

