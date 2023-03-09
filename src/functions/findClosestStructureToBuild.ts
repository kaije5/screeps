export function findClosestStructureToBuild(pos: RoomPosition): ConstructionSite | null {
    const structures = pos.findInRange(FIND_CONSTRUCTION_SITES, 3);
    if (structures.length > 0) {
      // Sort structures by hits/maximum hits ratio
      structures.sort((a, b) => a.progress / a.progressTotal - b.progress / b.progressTotal);
      return structures[0];
    } else {
      return null;
    }
  }
