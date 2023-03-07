export class Harvester {
    private creep: Creep;

    constructor(creep: Creep) {
      this.creep = creep;
    }

    public harvest() {
      const source = this.creep.pos.findClosestByPath(FIND_SOURCES);
      if (source) {
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(source);
        }
      }
    }
  }
