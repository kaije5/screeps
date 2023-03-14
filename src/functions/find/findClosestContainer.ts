export function findClosestContainerWithEnergy(pos: RoomPosition): StructureContainer | null {
    const container: StructureContainer | null = pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    });
    return container;
}

export function findClosestContainerWithSpace(pos: RoomPosition): StructureContainer | null {
    const container: StructureContainer | null = pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });
    return container;
}
