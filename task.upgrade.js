var roleCourier = require('role.courier');
var roleHarvester = require('role.harvester');
var roleSpawn = require('role.spawn');
var roleUpgrader = require('role.upgrader');

var taskUpgrade = {
    run: function() {
        var nFreeCourier = 0, nHarvester = 0, nWorker = 0;
        
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
                Game.spawns['Spawn1'].memory.death++;
                continue;
            }

            if(creep.memory.role == 'courier') {
                roleCourier.run(creep);
                if(creep.memory.state == 'idle' || creep.memory.state == 'carry') {
                    nFreeCourier++;
                }
            }

            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
                nHarvester++;
            }
            
            if(creep.memory.role == 'worker') {
                roleUpgrader.run(creep);
                nWorker++;
            }
        }
        
        roleSpawn.run(Game.spawns['Spawn1']);

        if(!Game.spawns['Spawn1'].spawning) {
            if(nHarvester < 2 && nFreeCourier >= 1 ) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_'+Game.time, { memory: { role: 'harvester', state: 'idle', reserved: 0 } } );
            }
            else if(nFreeCourier < 1) {
                Game.spawns['Spawn1'].spawnCreep( [CARRY, CARRY, MOVE, MOVE], 'Courier_'+Game.time, { memory: { role: 'courier', state: 'idle', reserved: 0 } } );
            }
            else if(nUpgrader < 4 ) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Worker_'+Game.time, { memory: { role: 'worker', state: 'idle', reserved: 0 } } );
            }
        }

	}
};

module.exports = taskUpgrade;