export class CreepSpawner {
    private room: Room;

    constructor(room: Room) {
      this.room = room;
    }

    private countCreeps(role: string) {
      return _.filter(Game.creeps, (creep) => creep.memory.role === role).length;
    }

    private spawnCreep(role: string, body: BodyPartConstant[], name: string) {
      const spawn = this.room.find(FIND_MY_SPAWNS)[0];
      if (spawn) {
        const result = spawn.spawnCreep(body, name, { memory: { role: role } });
        if (result === OK) {
          console.log(`Spawned new ${role} creep: ${name}`);
        }
      }
    }

    public spawnCreeps() {
      const harvesterCount = this.countCreeps("harvester");
      const upgraderCount = this.countCreeps("upgrader");
      const builderCount = this.countCreeps("builder");

      if (harvesterCount < 3) {
        this.spawnCreep("harvester", [WORK, CARRY, CARRY, MOVE, MOVE], `Harvester${Game.time}`);
      } else if (upgraderCount < 4) {
        this.spawnCreep("upgrader", [WORK, CARRY, CARRY, MOVE, MOVE], `Upgrader${Game.time}`);
      } else if (builderCount < 1) {
        this.spawnCreep("builder", [WORK, WORK, CARRY, MOVE], `Builder${Game.time}`);
      }
    }
  }
