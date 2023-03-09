import { findClosestSource } from "functions/findClosestSource";
import { findClosestStructureToRepair } from "functions/findClosestStructureToRepair";

export class Repairer {
  private readonly creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run(): void {
    if (this.creep.memory.repairing && this.creep.store[RESOURCE_ENERGY] === 0) {
      this.creep.memory.repairing = false;
      this.creep.say('🔄 harvest');
    }
    if (!this.creep.memory.repairing && this.creep.store.getFreeCapacity() === 0) {
      this.creep.memory.repairing = true;
      this.creep.say('🚧 repair');
    }

    if (this.creep.memory.repairing) {
      const target = findClosestStructureToRepair(this.creep.pos);
      if (target) {
        if (this.creep.repair(target) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    } else {
      const source = findClosestSource(this.creep.pos);
      if (source) {
        // Type assertion to convert nullable type to non-nullable type
        const closestSource = source as Source;
        // Harvest the source
        const result = this.creep.harvest(closestSource);
        if (result === ERR_NOT_IN_RANGE) {
          // Move towards the source
          this.creep.moveTo(closestSource);
        }
      }
    }
  }
}

export default Repairer;
