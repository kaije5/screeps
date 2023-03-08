class Builder {
  private readonly creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run(): void {
    if (this.creep.memory.building && this.creep.store[RESOURCE_ENERGY] === 0) {
      // If the creep is out of energy and currently building, it will stop building
      this.creep.memory.building = false;
    }

    if (!this.creep.memory.building && this.creep.store.getFreeCapacity() === 0) {
      // If the creep has energy and isn't currently building, it will start building
      this.creep.memory.building = true;
    }

    if (this.creep.memory.building) {
      // If the creep is currently building, it will try to find a construction site to work on
      const target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      if (target) {
        if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target);
        }
      }
    } else {
      // If the creep is not currently building, it will try to get energy from a nearby source
      const sources = this.creep.room.find(FIND_SOURCES);
      if (this.creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
}

export default Builder;
