import { findObjectsNeedingEnergy, findEnergyAvailable } from "./room-helpers";

// Define the shape of the energy request object
interface EnergyRequest {
  id: string;
  pos: RoomPosition;
  amount: number;
}

// Define the shape of the energy in transit object
interface EnergyInTransit {
  id: string;
  amount: number;
}

export function run(): void {
  // Find all objects in the room that need energy
  const objectsNeedingEnergy = findObjectsNeedingEnergy();

  // Find the total amount of energy available in the room
  const energyAvailable = findEnergyAvailable();

  // Calculate the amount of energy to send to each object
  const energyRequests: EnergyRequest[] = [];
  const energyInTransit: EnergyInTransit[] = [];
  objectsNeedingEnergy.forEach(object => {
    const energyNeeded = object.energyCapacity - object.energy;
    const energyAlreadyInTransit = energyInTransit
      .filter(e => e.id === object.id)
      .map(e => e.amount)
      .reduce((a, b) => a + b, 0);
    const energyToSend = Math.min(energyNeeded - energyAlreadyInTransit, energyAvailable);
    if (energyToSend > 0) {
      energyRequests.push({ id: object.id, pos: object.pos, amount: energyToSend });
      energyInTransit.push({ id: object.id, amount: energyToSend });
    }
  });

  // Send energy to each object in the energy request queue
  energyRequests.forEach(request => {
    const target = Game.getObjectById(request.id);
    if (target && target.structureType !== STRUCTURE_CONTROLLER) {
      const result = target.transferEnergy(target, request.amount);
      if (result === ERR_NOT_IN_RANGE) {
        //move to the object
      }
    }
  });
}
