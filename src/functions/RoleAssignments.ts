import { findCreepsInRoom } from "./find/findCreepsInRoom";

enum Role {
  HARVEST = "harvester",
  BUILD = "builder",
  UPGRADE = "upgrader",
  REPAIR = "repairer",
  WALL_REPAIR = "wall_repairer",
}

export function assignRole(room: Room): Role {
  const creepsInRoom = findCreepsInRoom(room);
  const harvesters = creepsInRoom.filter(creep => creep.memory.role === Role.HARVEST);
  const builders = creepsInRoom.filter(creep => creep.memory.role === Role.BUILD);
  const upgraders = creepsInRoom.filter(creep => creep.memory.role === Role.UPGRADE);
  const repairers = creepsInRoom.filter(creep => creep.memory.role === Role.REPAIR);
  const wallRepairers = creepsInRoom.filter(creep => creep.memory.role === Role.WALL_REPAIR);

  // calculate how many creeps we need for each role
  const numHarvesters = 3;
  const numBuilders = 5;
  const numUpgraders = 2;
  const numRepairers = 1;
  const numWallRepairers = 0;

  // calculate how many creeps we have for each role
  const numCurrentHarvesters = harvesters.length;
  const numCurrentBuilders = builders.length;
  const numCurrentUpgraders = upgraders.length;
  const numCurrentRepairers = repairers.length;
  const numCurrentWallRepairers = wallRepairers.length;

  // if we don't have enough creeps for a role, assign it to a new creep
  if (numCurrentHarvesters < numHarvesters) {
    return Role.HARVEST;
  } else if (numCurrentBuilders < numBuilders) {
    return Role.BUILD;
  } else if (numCurrentUpgraders < numUpgraders) {
    return Role.UPGRADE;
  } else if (numCurrentRepairers < numRepairers) {
    return Role.REPAIR;
  } else if (numCurrentWallRepairers < numWallRepairers) {
    return Role.WALL_REPAIR;
  }

  // if all roles are already filled, assign a random role
  const roles = [Role.BUILD, Role.UPGRADE, Role.HARVEST];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}
