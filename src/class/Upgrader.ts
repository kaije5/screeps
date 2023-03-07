export class Upgrader {
    private creep: Creep;

    constructor(creep: Creep) {
      this.creep = creep;
    }

    public upgrade() {
      const controller = this.creep.room.controller;
      if (controller) {
        if (this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(controller);
        }
      }
    }
  }
