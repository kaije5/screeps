//AttackEnemyCreeps.ts
import { CreepAction } from "./CreepAction";

export class AttackEnemyCreeps extends CreepAction {
  public run(creep: Creep): void {
    const enemies = creep.room.find(FIND_HOSTILE_CREEPS);
    if (enemies.length) {
      const closestEnemy = creep.pos.findClosestByPath(enemies);
      if (closestEnemy) {
        if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
          creep.moveTo(closestEnemy, { visualizePathStyle: { stroke: "#ff0000" } });
        }
      }
    } else {
      //console.log(`${creep.name} found no enemies in room ${creep.room.name}`);
      creep.moveTo(Game.flags["Rest"], { visualizePathStyle: { stroke: "#ff0000" } });
    }
  }
}
