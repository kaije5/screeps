class Upgrader {
  private readonly creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run(): void {
    if (this.creep.store[RESOURCE_ENERGY] === 0) {
      // If the creep is out of energy, it will try to get more
      const sources = this.creep.room.find(FIND_SOURCES);
      if (this.creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[0]);
      }
    } else {
      // If the creep has energy, it will try to upgrade the controller
      if (this.creep.upgradeController(this.creep.room.controller!) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.creep.room.controller!);
      }
    }
  }
}

export default Upgrader;
