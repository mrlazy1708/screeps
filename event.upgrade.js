var roleBuilder = require('role.builder');
var roleCourier = require('role.courier');
var roleHarvester = require('role.harvester');
var roleSpawn = require('role.spawn');
var roleStocker = require('role.stocker');
var roleTramp = require('role.tramp');
var roleUpgrader = require('role.upgrader');
var roleWorker = require('role.worker');

var eventUpgrade = {
    run: function() {
        var nWorker = 0, nFreeCourier = 0, nHarvester = 0, nUpgrader = 0, nStocker = 0, nBuilder = 0, nFreeBuilder = 0, nFreeTramp = 0;
        
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
            
            if(creep.memory.role == 'worker') {
                roleWorker.run(creep);
                nWorker++;
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
            
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
                nUpgrader++;
            }
            
            if(creep.memory.role == 'stocker') {
                roleStocker.run(creep);
                nStocker++;
            }
            
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
                nBuilder++;
                if(creep.memory.state == 'idle'){
                    nFreeBuilder++;
                }
            }
            
            if(creep.memory.role == 'tramp') {
                roleTramp.run(creep);
                if(creep.memory.state == 'idle') {
                    nFreeTramp++;
                }
            }
        }
        
        roleSpawn.run(Game.spawns['Spawn1']);
        
        if(nStocker < 1) {
            var _trans = Game.spawns['Spawn1'].pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.memory.role == 'courier';
                }
            });
            if(_trans) {
                _trans.memory.role = 'stocker';
                _trans.memory.state = 'idle';
                _trans.memory.reserved = 0;
            }
        }
        
        if(!Game.spawns['Spawn1'].spawning) {
            if(nHarvester < 2 && nFreeCourier >= 1 ) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_'+Game.time, { memory: { role: 'harvester', state: 'idle', reserved: 0 } } );
            }
            else if(nFreeCourier < 1) {
                Game.spawns['Spawn1'].spawnCreep( [CARRY, CARRY, MOVE], 'Courier_'+Game.time, { memory: { role: 'courier', state: 'idle', reserved: 0 } } );
            }
            else if(nUpgrader < 4 ) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'Upgrader_'+Game.time, { memory: { role: 'upgrader', state: 'idle', reserved: 0 } } );
            }
            else if(nBuilder < 1 && nFreeBuilder < 1 && nFreeTramp >= 1) {
                Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'Builder'+Game.time, { memory: { role: 'builder', state: 'idle', reserved: 0 } } );
            }
            else if(nFreeTramp < 1) {
                Game.spawns['Spawn1'].spawnCreep( [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Tramp_'+Game.time, { memory: { role: 'tramp', state: 'idle', reserved: 0 } } );
            }
        }

	}
};

module.exports = eventUpgrade;