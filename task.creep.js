const roleCourier = require('role.courier');
const roleHarvester = require('role.harvester');
const roleTraveler = require('role.traveler');

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
                            roleWorker.run(creep);
                        }
                    }
                }
            }
            else {
                const _creep = Memory.creeps[name];
                if(_creep.role == 'courier') {
                    let _target = Game.getObjectById(_creep.targetID);
                    if(_creep.reserved != 0 && _target != null) {
                        _target.memory.reserved -= _creep.reserved;
                    }
                }
                delete Memory.creeps[name];
                Memory.nDeath++;
            }
        }
    }
};

module.exports = taskCreep;