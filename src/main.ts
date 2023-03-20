import { ErrorMapper } from "utils/ErrorMapper";
import CustomSpawn from 'class/CustomSpawn';
import { run } from "functions/roles/civilean/worker";


declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}


// Main game loop
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  const spawns = Object.values(Game.spawns);
  const creeps = Object.values(Game.creeps);

  const room = Game.rooms["E52N17"]
  const totalAllowedCreeps = 25;

  // Spawn creeps
  for (const spawn of spawns) {
      const customSpawn = new CustomSpawn(spawn);
      // list creep ammount
      console.log("Harvester ammount " + customSpawn.countCreepsByRole("harvester"))
      console.log("Upgrader ammount " + customSpawn.countCreepsByRole("upgrader"))
      console.log("Builder ammount " + customSpawn.countCreepsByRole("builder"))
      console.log("Mover ammount " + customSpawn.countCreepsByRole("mover"))
      console.log("Repairer ammount " + customSpawn.countCreepsByRole("repairer"))
      console.log("WallRepairer ammount " + customSpawn.countCreepsByRole("wallRepairer"))

      //if creeps amount is less then totalAllowedCreeps spawn creeps.
      if (creeps.length < totalAllowedCreeps) {
        console.log("Creeps amount is less then totalAllowedCreeps spawning creep")
        customSpawn.spawnCreep();
      }
  }


  // Creep logic
  for (const creep of creeps) {
    run(creep)
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
