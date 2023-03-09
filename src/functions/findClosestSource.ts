export function findClosestSource(pos: RoomPosition): Source | null {
    const source = pos.findClosestByPath(FIND_SOURCES);
    return source;
  }
