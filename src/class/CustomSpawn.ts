declare var Memory: {
  creeps: {[name: string]: CreepMemory},
  spawns: {[name: string]: SpawnMemory},
  rooms: {[name: string]: RoomMemory}
};

// CustomSpawn.ts
class CustomSpawn {
  spawn: StructureSpawn;
  energyAvailable: number;
  energyCapacity: number;

  constructor(spawn: StructureSpawn) {
      this.spawn = spawn;
      this.energyAvailable = spawn.room.energyAvailable;
      this.energyCapacity = spawn.room.energyCapacityAvailable;
  }

  // Methods for spawning creeps will go here
  private getHarvesterBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const workParts = Math.min(Math.floor(this.energyAvailable / 150), 5);

    for (let i = 0; i < workParts; i++) {
        body.push(WORK);
    }
    body.push(MOVE);

    return body;
  }

  private getBuilderBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 200), 5);

    for (let i = 0; i < parts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    return body;
  }

  private getMoverBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const carryParts = Math.min(Math.floor(this.energyAvailable / 100), 16);

    for (let i = 0; i < carryParts; i++) {
        body.push(CARRY);
        body.push(MOVE);
    }

    return body;
  }

  private getRepairerBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 200), 5);

    for (let i = 0; i < parts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    return body;
  }

  private getUpgraderBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 200), 5);

    for (let i = 0; i < parts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    return body;
  }

  private getWallRepairerBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 200), 5);

    for (let i = 0; i < parts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    return body;
  }

  private countCreepsByRole(role: string): number {
    return _.filter(Game.creeps, (creep) => creep.memory.role === role).length;
  }

  private getAdjacentPositions(pos: RoomPosition): RoomPosition[] {
    const adjacentPositions = [];
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const x = pos.x + dx;
            const y = pos.y + dy;
            if (x >= 0 && x < 50 && y >= 0 && y < 50) {
                adjacentPositions.push(new RoomPosition(x, y, pos.roomName));
            }
        }
    }
    return adjacentPositions;
}

private countHarvestableSpots(): number {
    const sources = this.spawn.room.find(FIND_SOURCES);
    let harvestableSpots = 0;

    for (const source of sources) {
        const adjacentPositions = this.getAdjacentPositions(source.pos);
        for (const position of adjacentPositions) {
            if (position.lookFor(LOOK_TERRAIN)[0] !== "wall") {
                harvestableSpots++;
            }
        }
    }

    return harvestableSpots;
}

  private calculateCreepType(): string {
      const numMovers = this.countCreepsByRole("mover");
      const numHarvesters = this.countCreepsByRole("harvester");
      const numUpgraders = this.countCreepsByRole("upgrader");
      const numBuilders = this.countCreepsByRole("builder");

      if (numHarvesters === 0) {
          return "harvester";
      } else if (numMovers < 2) {
          return "mover";
      } else if (numUpgraders < 1) {
        return "upgrader";
      } else if (numBuilders < 1) {
        return "builder";
      } else if (numHarvesters < this.countHarvestableSpots()) {
        return "harvester";
      } else if (numMovers < 4) {
          return "mover";
      } else if (numUpgraders < 2) {
          return "upgrader";
      } else if (numBuilders < 2) {
          return "builder";
      } else {
      // If there are enough movers and harvesters, use the random selection
      const creepTypes = [
          "builder",
          "mover",
          "repairer",
          "upgrader",
          "wallRepairer",
      ];
      const index = Math.floor(Math.random() * creepTypes.length);
      return creepTypes[index];
    }
  }

  public spawnCreep(): ScreepsReturnCode | undefined {
      const creepType = this.calculateCreepType();
      let body: BodyPartConstant[] = [];

      if(this.energyAvailable >= 200) {
        switch (creepType) {
            case "builder":
                body = this.getBuilderBody();
                break;
            case "harvester":
                body = this.getHarvesterBody();
                break;
            case "mover":
                body = this.getMoverBody();
                break;
            case "repairer":
                body = this.getRepairerBody();
                break;
            case "upgrader":
                body = this.getUpgraderBody();
                break;
            case "wallRepairer":
                body = this.getWallRepairerBody();
                break;
            default:
                console.log("Unknown creep type:", creepType);
                return;
        }
      }

    // Create the creep with the calculated body and memory
    const creepName = `W-${Game.time}`;
    const memory: CreepMemory = { role: creepType, room: this.spawn.room.name, working: false};
    const result = this.spawn.spawnCreep(body, creepName, { memory });

    // Return the result of the `spawnCreep` method call
    return result;
  }
}

export default CustomSpawn;
