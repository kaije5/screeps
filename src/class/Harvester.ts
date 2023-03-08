class Harvester {
  private readonly creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run(): void {
    if (this.creep.memory.harvesting && this.creep.store.getFreeCapacity() === 0) {
      // If the creep is currently harvesting and is full, it will stop and start depositing energy
      this.creep.memory.harvesting = false;
      this.creep.say("🚚 deposit");
    }

    if (!this.creep.memory.harvesting && this.creep.store[RESOURCE_ENERGY] === 0) {
      // If the creep is not currently harvesting and is empty, it will start harvesting
      this.creep.memory.harvesting = true;
      this.creep.say("⛏️ harvest");
    }

    if (this.creep.memory.harvesting) {
      // If the creep is currently harvesting, it will try to find the closest energy source to harvest from
      const sources = this.creep.room.find(FIND_SOURCES_ACTIVE);
      const closestSource = this.creep.pos.findClosestByPath(sources);
      if (closestSource) {
        if (this.creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(closestSource);
        }
      }
    } else {
      // If the creep is not currently harvesting, it will try to find the closest structure that needs energy and deposit its energy there
      const targets = this.creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      const closestTarget = this.creep.pos.findClosestByPath(targets);
      if (closestTarget) {
        if (this.creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(closestTarget);
        }
      }
    }
  }
}

export default Harvester;
