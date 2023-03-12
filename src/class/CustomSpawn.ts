declare var Memory: {
  creeps: {[name: string]: CreepMemory},
  spawns: {[name: string]: SpawnMemory},
  rooms: {[name: string]: RoomMemory}
};

class CustomSpawn {
  private spawn: StructureSpawn;

  constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
  }

  get energyAvailable(): number {
    return this.spawn.store.getUsedCapacity(RESOURCE_ENERGY);
  }

  get energyCapacity(): number {
    return this.spawn.store.getCapacity(RESOURCE_ENERGY);
  }

  public spawnCreep() {

    if (this.energyAvailable === this.energyCapacity) {
      this.createCustomCreep(this.energyAvailable);
    }
  }

  public createCustomCreep(energy: number) {
    // Define the body parts and their costs
    const body: BodyPartConstant[] = [];
    let remainingEnergy = energy;
    const workCost = BODYPART_COST[WORK];
    const carryCost = BODYPART_COST[CARRY];
    const moveCost = BODYPART_COST[MOVE];

    // Add as many `WORK`, `CARRY`, and `MOVE` body parts as possible, in that order
    while (remainingEnergy >= workCost + carryCost + moveCost) {
      body.push(WORK);
      body.push(CARRY);
      body.push(MOVE);
      remainingEnergy -= workCost + carryCost + moveCost;
    }

    // Add `WORK` and `MOVE` body parts until the remaining energy is less than the cost of both
    while (remainingEnergy >= workCost + moveCost) {
      body.push(WORK);
      body.push(MOVE);
      remainingEnergy -= workCost + moveCost;
    }

    // Add `CARRY` and `MOVE` body parts until the remaining energy is less than the cost of both
    while (remainingEnergy >= carryCost + moveCost) {
      body.push(CARRY);
      body.push(MOVE);
      remainingEnergy -= carryCost + moveCost;
    }

    // Create the creep with the calculated body and memory
    const creepName = `W-${Game.time}`;
    const memory: CreepMemory = { jobState: 1};
    const result = this.spawn.spawnCreep(body, creepName, { memory });

    // Return the result of the `spawnCreep` method call
    return result;
  }
}

export { CustomSpawn };
