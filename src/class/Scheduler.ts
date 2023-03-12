import Worker, { Provider, Builder, Upgrader, Repairer } from "./Worker";

interface Job {
  type: "provider" | "upgrader" | "builder" | "repairer";
  location: RoomPosition;
}

class Scheduler {
  private queue: Job[];
  private creeps: Creep[];

  private spawn: StructureSpawn;

  constructor() {
    this.queue = [];

    // Get the spawn
    this.spawn = Object.values(Game.spawns)[0];

    // Get all creeps in the game
    this.creeps = Object.values(Game.creeps);
  }

  public enqueue(job: Job) {
    this.queue.push(job);
  }

  public dequeue(): Job | undefined {
    return this.queue.shift();
  }

  private state1(worker: Worker) {
    // Get energy from storages until the creep is full
    worker.retrieveEnergy();
    if (worker.creep.store.getFreeCapacity() === 0) {
      worker.creep.memory.jobState = 2;
    }
  }

  private state2(worker: Worker) {
    // Get job
    const job = this.getNextJobForCreep(worker.creep);
    if (job) {
      worker.creep.memory.jobType = job.type;
      worker.creep.memory.jobLocation = job.location;
      worker.creep.memory.jobState = 3;
    }
  }

  private state3(worker: Worker) {
    // Work on job until it's done
    switch (worker.creep.memory.jobType) {
      case "provider":
        var provider = new Provider(worker.creep);
        provider.deposit();
        break;
      case "upgrader":
        var upgrader = new Upgrader(worker.creep);
        upgrader.upgrade();
        break;
      case "builder":
        var builder = new Builder(worker.creep);
        builder.build();
        break;
      case "repairer":
        var repairer = new Repairer(worker.creep);
        repairer.repair();
        break;
      default:
        worker.creep.memory.jobState = 1;
        break;
    }
  }

  public getNextJobForCreep(creep: Creep): Job | undefined {
    // Retrieve a job from the queue based on the type and location
    const job = this.queue.find(j => j.type === creep.memory.jobType && j.location === creep.memory.jobLocation);
    if (job) {
      // Remove the job from the queue if it's found
      this.queue.splice(this.queue.indexOf(job), 1);
      return job;
    } else {
      // If no job is found, return undefined
      return undefined;
    }
  }

  public generateJobs() {
    // Generate jobs for all creeps make sure to balance the number of jobs for each type using the input parameters from the room memory
  }

  private providerJobs() {
    const sources: Source[] = this.spawn.room.find(FIND_SOURCES);
    for (const source of sources) {
      if (source.energy < source.energyCapacity) {
        const job: Job = {
          type: "provider",
          location: source.pos
        };
      }
    }
  }

  private builderJobs() {
    const constructionSites: ConstructionSite[] = this.spawn.room.find(FIND_CONSTRUCTION_SITES);
    for (const site of constructionSites) {
      const job: Job = {
        type: "builder",
        location: site.pos
      };

      // Add the job to the queue
      this.enqueue(job);
    }
  }

  private repairerJobs() {
    const structures: Structure[] = this.spawn.room.find(FIND_STRUCTURES);
    for (const structure of structures) {
      if (structure.hits < structure.hitsMax) {
        const job: Job = {
          type: "repairer",
          location: structure.pos
        };

        // Add the job to the queue
        this.enqueue(job);
      }
    }
  }

  private upgraderJobs() {
    const controller: StructureController | undefined = this.spawn.room.controller;
    if (controller) {
      const job: Job = {
        type: "upgrader",
        location: controller.pos
      };

      // Add the job to the queue
      this.enqueue(job);
    }
  }

  public assignJobsToCreeps() {
    // Assign jobs to creeps based on their type and location
    for (const creep of this.creeps) {
      const worker = new Worker(creep);
      switch (creep.memory.jobState) {
        case 1:
          // Get energy
          this.state1(worker);
          break;
        case 2:
          // Get job
          this.state2(worker);
          break;
        case 3:
          // Work on job
          this.state3(worker);
          break;
        default:
          // Invalid job state
          creep.memory.jobState = 2;
          break;
      }
    }
  }
}

export const scheduler = new Scheduler();
