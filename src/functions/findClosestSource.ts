//export function find the closest source with energy
export function findClosestSourceWithEnergy(pos: RoomPosition): Source | null {
    const sources = pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    return sources;
    }
