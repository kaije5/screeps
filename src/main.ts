import { ErrorMapper } from "utils/ErrorMapper";
import Harvester from "class/Harvester";
import Upgrader from "class/Upgrader";
import Builder from "class/Builder";
import Repairer from "class/Repairer";
import Defender from "class/Defender";
import { CustomSpawn } from 'class/CustomSpawn';

const spawn = Game.spawns['W22S37-SP01'];
const customSpawn = new CustomSpawn(spawn);

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
    building?: boolean;
    harvesting?: boolean;
    repairing?: boolean;
    upgrading?: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

interface SpawnMemory {
  [name: string]: any;
}

interface RoomMemory {
  [name: string]: any;
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  const spawns = Object.values(Game.spawns);

  for (const spawn of spawns) {
    const customSpawn = new CustomSpawn(spawn);

    customSpawn.spawnCreep();
  }
  // Iterate over all creeps in the game
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    // Check if the creep's role is "harvester"
    if (creep.memory.role === "harvester") {
      // Create a new instance of the Harvester class for this creep
      const harvester = new Harvester(creep);

      // Call the run() method on the Harvester instance
      harvester.run();
    }
    // Check if the creep's role is "upgrader"
    if (creep.memory.role === "upgrader") {
      // Create a new instance of the Upgrader class for this creep
      const upgrader = new Upgrader(creep);

      // Call the run() method on the Upgrader instance
      upgrader.run();
    }

    // Check if the creep's role is "builder"
    if (creep.memory.role === "builder") {
      // Create a new instance of the Builder class for this creep
      const builder = new Builder(creep);

      // Call the run() method on the Builder instance
      builder.run();
    }
    // Check if the creep's role is "repairer"
    if (creep.memory.role === "repairer") {
      // Create a new instance of the Builder class for this creep
      const repairer = new Repairer(creep);

      // Call the run() method on the Builder instance
      repairer.run();
    }
    // Check if the creep's role is "defender"
    if (creep.memory.role === "defender") {
      // Create a new instance of the Builder class for this creep
      const defender = new Defender(creep);

      // Call the run() method on the Builder instance
      defender.run();
    }
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
