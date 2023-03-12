//find closest storage with energy and return it
export function findClosestStorageWithEnergy(pos: RoomPosition): StructureStorage | null {
    const storage: StructureStorage | null = pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_STORAGE && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    });
    return storage;
}

export function findClosestStorageWithSpace(pos: RoomPosition): StructureStorage | null {
    const storage: StructureStorage | null = pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_STORAGE && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });
    return storage;
}
