import Worker, { Provider, Builder, Upgrader, Repairer } from "./Worker";

interface Job {
  type: "provider" | "upgrader" | "builder" | "repairer" | "harvester";
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
    // Generate all types of jobs. Balance the number of jobs based on the needed energy.

    // Get the number of creeps based on their type
    const harvesters = this.creeps.filter(c => c.memory.jobType === "harvester").length;
    const providers = this.creeps.filter(c => c.memory.jobType === "provider").length;
    const builders = this.creeps.filter(c => c.memory.jobType === "builder").length;
    const upgraders = this.creeps.filter(c => c.memory.jobType === "upgrader").length;
    const repairers = this.creeps.filter(c => c.memory.jobType === "repairer").length;

    // Get the number of jobs based on their type
    const harvesterJobs = this.queue.filter(j => j.type === "harvester").length;
    const providerJobs = this.queue.filter(j => j.type === "provider").length;
    const builderJobs = this.queue.filter(j => j.type === "builder").length;
    const upgraderJobs = this.queue.filter(j => j.type === "upgrader").length;
    const repairerJobs = this.queue.filter(j => j.type === "repairer").length;

    // Get the number of energy needed for each type of job
    const harvesterEnergy = harvesters * 50;
    const providerEnergy = providers * 50;
    const builderEnergy = builders * 50;
    const upgraderEnergy = upgraders * 50;
    const repairerEnergy = repairers * 50;

    // Get the number of energy available for each type of job
    const harvesterEnergyAvailable = harvesterJobs * 50;
    const providerEnergyAvailable = providerJobs * 50;
    const builderEnergyAvailable = builderJobs * 50;
    const upgraderEnergyAvailable = upgraderJobs * 50;
    const repairerEnergyAvailable = repairerJobs * 50;

    // Get the number of jobs needed for each type of job
    const harvesterJobsNeeded = Math.ceil((harvesterEnergy - harvesterEnergyAvailable) / 50);
    const providerJobsNeeded = Math.ceil((providerEnergy - providerEnergyAvailable) / 50);
    const builderJobsNeeded = Math.ceil((builderEnergy - builderEnergyAvailable) / 50);
    const upgraderJobsNeeded = Math.ceil((upgraderEnergy - upgraderEnergyAvailable) / 50);
    const repairerJobsNeeded = Math.ceil((repairerEnergy - repairerEnergyAvailable) / 50);

    // Generate jobs
    for (let i = 0; i < harvesterJobsNeeded; i++) {
      this.harvesterJobs();
    }
    for (let i = 0; i < providerJobsNeeded; i++) {
      this.providerJobs();
    }
    for (let i = 0; i < builderJobsNeeded; i++) {
      this.builderJobs();
    }
    for (let i = 0; i < upgraderJobsNeeded; i++) {
      this.upgraderJobs();
    }
    for (let i = 0; i < repairerJobsNeeded; i++) {
      this.repairerJobs();
    }

  }

  private harvesterJobs() {
    // Get all sources in the room
    const sources: Source[] = this.spawn.room.find(FIND_SOURCES);
    // Create a job for each source
    for (const source of sources) {
      const job: Job = {
        type: "harvester",
        location: source.pos
      };
    }
  }

  private providerJobs() {

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
