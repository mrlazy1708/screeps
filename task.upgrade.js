var roleClaimer = require('role.claimer');
var roleCourier = require('role.courier');
var roleHarvester = require('role.harvester');
var roleSpawn = require('role.spawn');
var roleUpgrader = require('role.upgrader');

var taskUpgrade = {
    run: function() {
        var nFreeCourier = 0, nCourier = 0, nHarvester = 0, nWorker = 0, nClaimer = 0;
        
        for(var name in Memory.creeps) {
            var creep = Game.creeps[name];
            if(!creep) {
                var _creep = Memory.creeps[name];
                if(_creep && _creep.role == 'courier') {
                    if(_creep.reserved != 0) {
                        var _target = Game.getObjectById(_creep.targetID);
                        if(_target) {
                            _target.memory.reserved -= _creep.reserved;
                        }
                    }
                }
                delete Memory.creeps[name];
                Memory.nDeath++;
                continue;
            }

            if(creep.memory.role == 'courier') {
                roleCourier.run(creep);
                if(creep.memory.state != 'get' && creep.memory.state != 'give') {
                    nFreeCourier++;
                }
                nCourier++;
            }

            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
                nHarvester++;
            }
            
            if(creep.memory.role == 'worker') {
                roleUpgrader.run(creep);
                nWorker++;
            }

            if(creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
                nClaimer++;
            }
        }
        
        roleSpawn.run(Game.spawns['Spawn1']);

        if(!Game.spawns['Spawn1'].spawning) {
            if(nClaimer < 1) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Claimer_'+Game.time, { memory: { role: 'claimer', state: 'h', reserved: 0 } } );                
            }
            else if(nHarvester < 2 && nCourier >= 1) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_'+Game.time, { memory: { role: 'harvester', state: 'idle', reserved: 0 } } );
            }
            else if(nFreeCourier < 1) {
                Game.spawns['Spawn1'].spawnCreep( [CARRY, CARRY, MOVE, MOVE], 'Courier_'+Game.time, { memory: { role: 'courier', state: 'idle', reserved: 0 } } );
            }
            else if(nWorker < 4) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Worker_'+Game.time, { memory: { role: 'worker', state: 'idle', reserved: 0 } } );
            }
        }

	}
};

module.exports = taskUpgrade;