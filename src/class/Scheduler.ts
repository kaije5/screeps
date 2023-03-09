import Worker from "./Worker";

interface Job {
  type: "harvester" | "upgrader" | "builder" | "repairer";
  location: RoomPosition;
}

class Scheduler {
  private queue: Job[];
  private creeps: Creep[];


  constructor() {
    this.queue = [];



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
    // Get energy
    worker.harvest();
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
      case "harvester":
        worker.deposit();
        break;
      case "upgrader":
        worker.upgrade();
        break;
      case "builder":
        worker.build();
        break;
      case "repairer":
        worker.repair();
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

  private harvesterJobs() {
    const sources: Source[] = this.spawn.room.find(FIND_SOURCES);
    for (const source of sources) {
      if (source.energy < source.energyCapacity) {
        const job: Job = {
          type: "harvester",
          location: source.pos
        };
      }
    }
  }

//  private builderJobs() {
//    const constructionSites: ConstructionSite[] = Game.constructionSites;
//
//    for (const site of constructionSites) {
//      const job: Job = {
//        type: "builder",
//        location: site.pos
//      };
//
      // Add the job to the queue
//      this.enqueue(job);
//    }
//  }

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
    const job: Job = {
      type: "upgrader",
      location: this.controller.pos
    };
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
