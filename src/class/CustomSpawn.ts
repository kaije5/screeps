declare var Memory: {
  creeps: {[name: string]: CreepMemory},
  spawns: {[name: string]: SpawnMemory},
};

// CustomSpawn.ts
class CustomSpawn {
  spawn: StructureSpawn;
  creeps: Creep[];
  energyAvailable: number;
  energyCapacity: number;

  constructor(spawn: StructureSpawn) {
      this.spawn = spawn;
      this.creeps = spawn.room.find(FIND_MY_CREEPS);
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

  private getDefenderBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 200), 5);

    for (let i = 0; i < parts; i++) {
        body.push(TOUGH);
        body.push(ATTACK);
        body.push(MOVE);
    }

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

  private getClaimerBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 650), 1);

    for (let i = 0; i < parts; i++) {
        body.push(CLAIM);
        body.push(MOVE);
    }

    return body;
  }

  private getAttackerBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 80), 25);

    for (let i = 0; i < parts; i++) {
        body.push(ATTACK);
        body.push(MOVE);
    }

    return body;
  }

  private getHealerBody(): BodyPartConstant[] {
    const body: BodyPartConstant[] = [];
    const parts = Math.min(Math.floor(this.energyAvailable / 250), 5);

    for (let i = 0; i < parts; i++) {
        body.push(HEAL);
        body.push(MOVE);
    }

    return body;
  }

  public countCreepsByRole(role: string): number {
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
      const numRepairers = this.countCreepsByRole("repairer");
      const numWallRepairers = this.countCreepsByRole("wallRepairer");
      const numDefenders = this.countCreepsByRole("defender");
      const numClaimers = this.countCreepsByRole("claimer");
      const numAttackers = this.countCreepsByRole("attacker");

      if (numHarvesters === 0) {
          return "harvester";
      } else if (numMovers < 2) {
          return "mover";
      } else if (numUpgraders < 1) {
        return "upgrader";
      } else if (numBuilders < 1) {
        return "builder";
      } else if (numRepairers < 1) {
        return "repairer";
      } else if (numWallRepairers < 1) {
        return "wallRepairer";
      } else if (numHarvesters < this.countHarvestableSpots()) {
        return "harvester";
      } else if (2 * numMovers < numHarvesters) {
          return "mover";
      } else if (numUpgraders < 2) {
          return "upgrader";
      } else if (numBuilders < 3) {
          return "builder";
      } else if (numDefenders < 2) {
          return "defender";
      } else if (numClaimers < 1) {
          return "claimer";
      } else if (numAttackers < 3) {
          return "attacker";
      } else {
      // If there are enough movers and harvesters, use the random selection
      const creepTypes = [
          "builder",
          "mover",
          "upgrader",
          "defender",
          "attacker"
      ];
      const index = Math.floor(Math.random() * creepTypes.length);
      return creepTypes[index];
    }
  }

  public spawnCreep(): ScreepsReturnCode | undefined {
      const creepType = this.calculateCreepType();
      let body: BodyPartConstant[] = [];

      if(this.energyAvailable >= 450) {
        console.log("Spawning creep of type:", creepType);
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
            case "defender":
                body = this.getDefenderBody();
                break;
            case "claimer":
                body = this.getClaimerBody();
                break;
            default:
                console.log("Unknown creep type:", creepType);
                return;
        }
      }

    // Create the creep with the calculated body and memory
    const creepName = `W-${Game.time}`;
    const memory: CreepMemory = { role: creepType, working: false};
    const result = this.spawn.spawnCreep(body, creepName, { memory });

    // Return the result of the `spawnCreep` method call
    return result;
  }
}

export default CustomSpawn;
