import { findClosestSource } from "functions/findClosestSource";

class Upgrader {
  private readonly creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run(): void {
    if (this.creep.memory.upgrading && this.creep.store[RESOURCE_ENERGY] === 0) {
      this.creep.memory.upgrading = false;
      this.creep.say('🔄 harvest');
    }
    if (!this.creep.memory.upgrading && this.creep.store.getFreeCapacity() === 0) {
      this.creep.memory.upgrading = true;
      this.creep.say('⚡ upgrade');
    }

    if (this.creep.memory.upgrading) {
      if (this.creep.upgradeController(this.creep.room.controller!) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.creep.room.controller!, { visualizePathStyle: { stroke: '#ffffff' } });
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

export default Upgrader;

