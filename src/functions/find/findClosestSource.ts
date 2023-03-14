//export function find the closest source
export function findClosestSource(pos: RoomPosition): Source | null {
    return pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    }
