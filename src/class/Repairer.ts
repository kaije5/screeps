import { findClosestStructureToRepair } from "./findClosestStructureToRepair";

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
      const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (source) {
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }
}

export default Repairer;
