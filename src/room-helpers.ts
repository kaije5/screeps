export function findObjectsNeedingEnergy(): AnyStructure[] {
  const room = Game.spawns.Spawn1.room;
  const structures = room.find(FIND_STRUCTURES, {
    filter: s =>
      s.structureType !== STRUCTURE_WALL &&
      s.structureType !== STRUCTURE_RAMPART &&
      s.structureType !== STRUCTURE_CONTROLLER &&
      s.energy < s.energyCapacity
  });
  const creeps = room.find(FIND_MY_CREEPS, {
    filter: c => c.carry.energy < c.carryCapacity
  });
  return structures.concat(creeps);
}

export function findEnergyAvailable(): number {
  const room = Game.spawns.Spawn1.room;
  return room.energyAvailable;
}
