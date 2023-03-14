import { run } from "./roles/civilean/worker";

import { assignRole } from "./RoleAssignments";
import { AssignBuildStructure, assignDepositStructure, AssignHarvestSource, AssignRepairStructure, AssignUpgradeController } from "./StructureAssignment";
import { harvest } from "./roles/civilean/harvest";

export function dispatch(status: number, creep: Creep) {
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
            //status7(creep);
            creep.memory.status = 1;
            break;
        case 8:
            //status8(creep);
            creep.memory.status = 1;
            break;
        case 0:
            status0(creep.room);
            break;

        default:
            creep.memory.status = 1;
            break;
    }

    // Get energy status
    function status1(creep: Creep) {
        //creep.say("status1")
        harvest(creep);
    }

    // At rest position status
    function status2(creep: Creep) {
        //creep.say("status2")
        creep.memory.status = 5;
    }

    // Move to work status
    function status3(creep: Creep) {
        //creep.say("status3")
        let target = Game.getObjectById(creep.memory.target);
        // if creep has no target
        if (target === undefined) {
            // change status to request status
            creep.memory.status = 5;
        } else {
            // if creep has target
            // move to target
            const target = creep.memory.target;
            if (creep.pos.isNearTo(target.pos.x, target.pos.y)) {
                // change status to work status
                creep.memory.status = 4;
            } else {
                creep.moveTo(target.pos.x, target.pos.y, { visualizePathStyle: { stroke: "#ffaa00" } });
            }
        }
    }

    // At work status
    function status4(creep: Creep) {
        //creep.say("status4")
        //if creep is trying to build but has no energy left
        const creepCarrying = creep.store.getUsedCapacity();
        if (creepCarrying === 0) {
            //change status to get energy
            creep.memory.status = 1;
            creep.memory.target = undefined;
        } else {
            run(creep);
        }

    }

    // Request status
    function status5(creep: Creep, room: Room) {
        //creep.say("status5")
        if (creep.memory.role === undefined) {
            assignRole(room);
        } else if (creep.store.getUsedCapacity() === 0) {
            // change status to get energy
            creep.memory.status = 1;
        } else if (!creep.memory.target) {
            // if creep has no target
            switch (creep.memory.role) {
                case "harvester":
                    assignDepositStructure(creep);
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
        } else if (creep.memory.target) {
            // change status to move to work status
            creep.memory.status = 3;
        }
    }

    // Emergency status
    function status0(room: Room) {
        creep.say("status0")

    }
}
