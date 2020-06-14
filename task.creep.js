const roleCourier = require('role.courier');
const roleHarvester = require('role.harvester');
const roleTraveler = require('role.traveler');
const roleWorkerBuild = require('role.worker.build');
const roleWorkerJack = require('role.worker.jack');
const rolwWorkerUpgrade = require('role.worker.upgrade');

const taskCreep = {
    run: function() {
        for(let name in Memory.creeps) {
            let creep = Game.creeps[name];
            if(creep != null) {
                if(creep.memory.painc != Game.time) {
                    if(creep.memory.state == 'travel') {
                        roleTraveler.run(creep);
                    }
                    else {
                        if(creep.memory.role == 'courier') {
                            roleCourier.run(creep);
                        }
                        if(creep.memory.role == 'harvester') {
                            roleHarvester.run(creep);
                        }
                        if(creep.memory.role == 'worker') {
                            if(creep.memory.work == 'build') {
                                roleWorkerBuild.run(creep);
                            }
                            if(creep.memory.work == 'jack') {
                                roleWorkerJack.run(creep);
                            }
                            if(creep.memory.work == 'upgrade') {
                                rolwWorkerUpgrade.run(creep);
                            }
                        }
                    }
                }
            }
            else {
                const _creep = Memory.creeps[name];
                if(_creep.role == 'harvester') {
                    // if(!_creep.report)
                    Game.rooms[_creep.home].memory.nHarvester--;
                }

                if(_creep.role == 'courier') {
                    let _target = Game.getObjectById(_creep.targetID);
                    if(_target != null) {
                        _target.memory.reserved -= _creep.reserved;
                    }
                    
                    if(_creep.state != 'get' || _creep.state == 'give') {
                        Game.rooms[_creep.home].memory.nSleep--;
                    }
                }
                delete Memory.creeps[name];
                Memory.nDeath++;
            }
        }
    }
};

module.exports = taskCreep;