export function findClosestStructureToRepair(pos: RoomPosition): Structure | null {
    const structures = pos.findInRange(FIND_STRUCTURES, 3, {
      filter: (s) => s.hits < s.hitsMax
    });

    if (structures.length > 0) {
      // Sort structures by hits/maximum hits ratio
      structures.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
      return structures[0];
    } else {
      return null;
    }
  }
