import { ErrorMapper } from "utils/ErrorMapper";
import Harvester from "class/Harvester";
import Upgrader from "class/Upgrader";
import Builder from "class/Builder";
import { CreepSpawner } from "class/Spawner";

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
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    const creepSpawner = new CreepSpawner(room);
    creepSpawner.spawnCreeps();
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
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
