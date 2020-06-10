const workBuild = require('work.build');
const workJack = require('work.jack');
const workUpgrade = require('work.upgrade');

function check(creep) {
    let sum = creep.memory.reserved - creep.store.getFreeCapacity(RESOURCE_ENERGY);
    if(sum < 0) {
        global.task.collect.Push({time: 3, pri: sum, hostID: creep.id});
    }
}

const roleWorker = {
    run: function(creep) {
        creep.sample();
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
