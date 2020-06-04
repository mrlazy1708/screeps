const roleBuilder = require('role.builder');
const roleCourier = require('role.courier');
const roleHarvester = require('role.harvester');
const roleJack = require('role.jack');
const roleSpawn = require('role.spawn');
const roleTraveler = require('role.traveler');
const roleUpgrader = require('role.upgrader');

const taskCreep = {
    run: function() {
        let nFreeCourier = 0, nCourier = 0, nHarvester = 0, nWorker = 0, nJack = 0;
        
        for(let name in Memory.creeps) {
            let creep = Game.creeps[name];

            if(creep != null) {//ticks to live
                if(creep.painc != Game.time){
                    if(creep.memory.state != 'travel') {
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

                        if(creep.memory.role == 'jack') {
                            roleJack.run(creep);
                            nJack++;
                        }
                    }
                    else {
                        roleTraveler.run(creep);
                    }
                }
            }
            else {
                const _creep = Memory.creeps[name];
                if(_creep && _creep.role == 'courier') {
                    if(_creep.reserved != 0) {
                        let _target = Game.getObjectById(_creep.targetID);
                        if(_target) {
                            _target.memory.reserved -= _creep.reserved;
                        }
                    }
                }
                delete Memory.creeps[name];
                Memory.nDeath++;
            }
        }

const room = Game.spawns['Spawn1'].room;
        if(!Game.spawns['Spawn1'].spawning) {
            if(nJack == 0) {
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Jack_'+Game.time, {memory: {role: 'jack', roomName: 'E44S32', state: 'travel'}});
            }
            else if(nHarvester < 2 && nCourier >= 1) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_'+Game.time, {memory: {role: 'harvester', roomName: room.name, state: 'travel', reserved: 0}});
            }
            else if(nFreeCourier < 1) {
                Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, MOVE], 'Courier_'+Game.time, {memory: {role: 'courier', roomName: room.name, state: 'travel', reserved: 0}});
            }
            else if(nWorker < 4) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Worker_'+Game.time, {memory: {role: 'worker',roomName: room.name, state: 'travel', reserved: 0}});
            }
        }

    }
};

module.exports = taskCreep;