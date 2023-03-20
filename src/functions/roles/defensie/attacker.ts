import { AttackEnemyCreeps } from "class/AttackEnemyCreeps";

export function attacker(creep: Creep) {
    if (creep.memory.targetRoom === undefined) {
      creep.memory.targetRoom = "E52N17";
    } else if (creep.room.name !== creep.memory.targetRoom) {
      const route = Game.map.findRoute(creep.room, creep.memory.targetRoom);
      if (Array.isArray(route) && route.length > 0) {
        const exitDir = route[0].exit;
        const exit = creep.pos.findClosestByRange(exitDir);
        if (exit) {
          creep.moveTo(exit, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
        //attack logic
        const attackEnemyCreeps = new AttackEnemyCreeps();
        attackEnemyCreeps.run(creep);
    }
  }
