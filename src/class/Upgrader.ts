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
      // If the creep is out of energy, it will try to get more
      const sources = this.creep.room.find(FIND_SOURCES);
      if (this.creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
}

export default Upgrader;

