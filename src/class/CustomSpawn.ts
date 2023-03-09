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

  private countCreeps(role: string) {
    return _.filter(Game.creeps, (creep) => creep.memory.role === role).length;
  }

  public spawnCreep() {
    const harvesterCount = this.countCreeps("harvester");
    const upgraderCount = this.countCreeps("upgrader");
    const builderCount = this.countCreeps("builder");
    const RepairerCount = this.countCreeps("repairer");
    const DefenderCount = this.countCreeps("defender");

    const energyAvailable = this.spawn.room.energyAvailable;

    if (harvesterCount < 3) {
      this.createCustomCreep(energyAvailable, "harvester");
    } else if (upgraderCount < 1) {
      this.createCustomCreep(energyAvailable, "upgrader");
    } else if (DefenderCount < 2) {
      this.createCustomCreep(energyAvailable, "defender");
    } else if (builderCount < 1) {
      this.createCustomCreep(energyAvailable, "builder");
    } else if (RepairerCount < 2) {
      this.createCustomCreep(energyAvailable, "repairer");
    }
  }

  public createCustomCreep(energy: number, roleName: string) {
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
    const creepName = `${roleName}_${Game.time}`;
    const memory: CreepMemory = { role: roleName };
    const result = this.spawn.spawnCreep(body, creepName, { memory });

    // Return the result of the `spawnCreep` method call
    return result;
  }
}

export { CustomSpawn };
