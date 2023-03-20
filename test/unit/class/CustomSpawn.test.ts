import { expect } from 'chai';
import sinon from 'sinon';
import CustomSpawn from '../../../src/class/CustomSpawn';

describe('CustomSpawn', () => {
  let spawnStub: StructureSpawn;

  beforeEach(() => {
    spawnStub = {
      room: {
        find: sinon.stub(),
        energyAvailable: 1000,
        energyCapacityAvailable: 2000,
      },
    } as any;
  });

  describe('constructor', () => {
    it('should initialize properties correctly', () => {
      const customSpawn = new CustomSpawn(spawnStub);
      expect(customSpawn.spawn).to.equal(spawnStub);
      expect(customSpawn.energyAvailable).to.equal(spawnStub.room.energyAvailable);
      expect(customSpawn.energyCapacity).to.equal(spawnStub.room.energyCapacityAvailable);
    });
  });

  describe('countCreepsByRole', () => {
    it('should count creeps by role correctly', () => {
      const customSpawn = new CustomSpawn(spawnStub);
      const creepsStub = {
        creep1: { memory: { role: 'harvester' } },
        creep2: { memory: { role: 'harvester' } },
        creep3: { memory: { role: 'builder' } },
      };
      sinon.stub(Game, 'creeps').value(creepsStub);

      expect(customSpawn.countCreepsByRole('harvester')).to.equal(2);
      expect(customSpawn.countCreepsByRole('builder')).to.equal(1);

      (Game.creeps as any).restore();
    });
  });
});
