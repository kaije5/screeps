class Defender {
    private readonly creep: Creep;

    constructor(creep: Creep) {
      this.creep = creep;
    }

    public run(): void {
      const target = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (target) {
        if (this.creep.attack(target) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
        }
      } else {
        const roomName = this.creep.room.name;
        const room = Game.rooms[roomName];
        if (room) {
          this.creep.moveTo(room.controller!, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  }

  export default Defender;
