const workBuild = require('work.build');
const workJack = require('work.jack');
const workUpgrade = require('work.upgrade');

function check(creep) {
    if(!creep.memory.wait) {
        let sum = creep.memory.reserved - creep.store.getFreeCapacity(RESOURCE_ENERGY);
        if(sum < 0) {
            creep.memory.wait = true;
            Memory.task.collect.Push({time: Game.time*2 - creep.memory.time, pri: sum, hostID: creep.id});
            creep.memory.time = Game.time;
        }
    }
}

const roleWorker = {
    run: function(creep) {
        if(creep.memory.work == 'build') {
            workBuild.run(creep);
            check(creep);
        }
        if(creep.memory.work == 'jack') {
            workJack.run(creep);
        }
        if(creep.memory.work == 'upgrade') {
            workUpgrade.run(creep);
			check(creep);
        }
    }
};

module.exports = roleWorker;
