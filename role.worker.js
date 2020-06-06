const pq = require('priority_queue');
const workBuild = require('work.build');
const workJack = require('work.jack');
const workUpgrade = require('work.upgrade');

function check(creep) {
	let sum = creep.memory.reserved - creep.store.getFreeCapacoty(RESOURCE_ENERGY);
	if(sum < 0) {
		pq.insert(global.collect, {time: 2, pri: sum, hostID: creep.id});
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
