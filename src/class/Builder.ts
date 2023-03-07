export class Builder {
    private creep: Creep;

    constructor(creep: Creep) {
      this.creep = creep;
    }

    public build() {
      const constructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (constructionSite) {
        if (this.creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(constructionSite);
        }
      }
    }
  }
