import { findClosestStructureToRepair } from "../functions/findClosestStructureToRepair";
import { findClosestSourceWithEnergy } from "../functions/findClosestSourceWithEnergy";
import { findClosestStorageWithEnergy } from "../functions/findClosestStorageWithEnergy";
import { findClosestStructureToBuild } from "functions/findClosestStructureToBuild";

class Worker {
  public creep: Creep;

  private spawns: StructureSpawn[];
  private structures: Structure[];

  constructor(creep: Creep) {
    this.creep = creep;

    // Get all structures in the game
    this.structures = Object.values(Game.structures);

    // Get all spawns in the game
    this.spawns = Object.values(Game.spawns);
  }

  public retrieveEnergy(): void {
    // If the creeps energy is not full retrieve energy from the closest storage
    const storage = findClosestStorageWithEnergy(this.creep.pos);
    if (storage && this.creep.store.getFreeCapacity() > 0) {
      if (this.creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }

}

class Provider extends Worker {
  constructor(creep: Creep) {
    super(creep);
  }

  // Provide energy to structures: extensions, spawns, towers
  public deposit(): void {
    // If the creep is not currently harvesting, it will try to find the closest structure that needs energy and deposit its energy there
    const targets = this.creep.room.find(FIND_MY_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });
    const closestTarget = this.creep.pos.findClosestByPath(targets);
    if (closestTarget && this.creep.store.getUsedCapacity() > 0) {
      if (this.creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(closestTarget, { visualizePathStyle: { stroke: "#ffffff" } });
      } else if (this.creep.store.getUsedCapacity() === 0) {
        this.creep.memory.jobState = 1;
      }
    }
  }
}

class Builder extends Worker {
  constructor(creep: Creep) {
    super(creep);
  }

  public build(): void {
    const target = findClosestStructureToBuild(this.creep.pos);
    if (target && this.creep.store.getUsedCapacity() > 0) {
      if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
      } else if (this.creep.store.getUsedCapacity() === 0) {
        this.creep.memory.jobState = 1;
      }
    }
  }
}

class Upgrader extends Worker {
  constructor(creep: Creep) {
    super(creep);
  }

  public upgrade(): void {
    const controller = this.creep.room.controller;
    if (controller && this.creep.store.getUsedCapacity() > 0) {
      if (this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
      } else if (this.creep.store.getUsedCapacity() === 0) {
        this.creep.memory.jobState = 1;
      }
    }
  }
}

class Repairer extends Worker {
  constructor(creep: Creep) {
    super(creep);
  }

  public repair(): void {
    const target = findClosestStructureToRepair(this.creep.pos);
    if (target && this.creep.store.getUsedCapacity() > 0) {
      if (this.creep.repair(target) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
      } else if (this.creep.store.getUsedCapacity() === 0) {
        this.creep.memory.jobState = 1;
      }
    }
  }
}

export { Provider, Builder, Upgrader, Repairer };


export default Worker;
