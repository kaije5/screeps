export function findCreepsInRoom(room: Room): Creep[] {
  const creeps: Creep[] = room.find(FIND_MY_CREEPS);
  return creeps
}
