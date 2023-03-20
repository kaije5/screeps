import { AttackEnemyCreeps } from "class/AttackEnemyCreeps";

export function defender(creep: Creep) {
    const attackEnemyCreeps = new AttackEnemyCreeps();
    attackEnemyCreeps.run(creep);
}
