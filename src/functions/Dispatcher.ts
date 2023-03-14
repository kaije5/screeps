import { putInStorageContainer } from "./put/putInStorageContainer";
import { retrieveFromSource } from "./retrieve/retrieveFromSource";
import { retrieveFromStorageContainer } from "./retrieve/retrieveFromStorageContainer";

import { run } from "./roles/civilean/worker";

import { assignRole } from "./RoleAssignments";
import { AssignBuildStructure, AssignHarvestSource, AssignRepairStructure, AssignUpgradeController } from "./StructureAssignment";

export function dispatch(status: number) {
    switch (status) {
        case 1:
            status1(creep);
            break;
        case 2:
            status2(creep);
            break;
        case 3:
            status3(creep);
            break;
        case 4:
            status4(creep);
            break;
        case 5:
            status5(creep, creep.room);
            break;
        case 7:
            status7(creep);
            break;
        case 8:
            status8(creep);
            break;
        case 0:
            status0(creep.room);
            break;

        default:
            break;
    }

    // Get energy status
    function status1(creep: Creep) {
        //creep.say("status1")
        //if creep is trying to build but has no energy left
        const creepCarrying = creep.store.getUsedCapacity();
        const creepCarryingCapacity = creep.store.getCapacity();
        if (creepCarrying < creepCarryingCapacity) {
            //retrieve energy
            retrieveFromSource(creep);
        } else {
            //change status to store energy
            creep.memory.status = 8;
        }
    }

    // At rest position status
    function status2(creep: Creep) {
        //creep.say("status2")
        creep.memory.status = 5;
    }

    // Move to work status
    function status3(creep: Creep) {
        //creep.say("status3")
        const target = creep.memory.target;
        if(target) {
            // if creep is not in range of target
            if (creep.pos.getRangeTo(target) !== 1) {
                // move to target
                const pos = target.pos;
                creep.moveTo(pos, { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                // change status to at work status
                creep.memory.status = 4;
            }
        } else {
            // change status to request status
            creep.memory.status = 5;
        }
    }

    // At work status
    function status4(creep: Creep) {
        //creep.say("status4")
        //if creep is trying to build but has no energy left
        const creepCarrying = creep.store.getUsedCapacity();
        const creepCarryingCapacity = creep.store.getCapacity();
        if (creepCarrying === 0) {
            //change status to get energy
            creep.memory.status = 1;
        } else {
        run(creep);
        }
    }

    // Request status
    function status5(creep: Creep, room: Room) {
        //creep.say("status5")
        if (creep.memory.role === undefined) {
            assignRole(room);
        } else if (!creep.memory.target) {
            // if creep has no target
            switch (creep.memory.role) {
                case "harvester":
                    AssignHarvestSource(creep);
                    break;
                case "builder":
                    AssignBuildStructure(creep);
                    break;
                case "upgrader":
                    AssignUpgradeController(creep);
                    break;
                case "repairer":
                    AssignRepairStructure(creep);
                    break;

                default:
                    break;
            }
        } else {
            // change status to move to work status
            creep.memory.status = 3;
        }
    }

    // Retrieve energy status
    function status7(creep: Creep) {
        //creep.say("status7")
        // if creep is not full and has no target
        const creepCarrying = creep.store.getUsedCapacity();
        const creepCarryingCapacity = creep.store.getCapacity();
        if (creepCarrying < creepCarryingCapacity && creep.memory.target === undefined) {
            //retrieve energy
            retrieveFromStorageContainer(creep);
        } else {
            //change status to request status
            creep.memory.status = 5;
        }
    }

    // Store energy status
    function status8(creep: Creep) {
        //creep.say("status8")
        putInStorageContainer(creep);
    }

    // Emergency status
    function status0(room: Room) {
        creep.say("status0")

    }
}
