const profiler = require('screeps-profiler');
const roleTower = require('role.tower');
const taskCreep = require('task.creep');
const taskExamine = require('task.examine');
const taskInit = require('task.init');
const taskNotify = require('task.notify');
const taskRoom = require('task.room');

profiler.enable();

module.exports.loop = function () {
	// profiler.wrap(function() {
		taskInit.run();

		taskRoom.run();

		taskCreep.run();

		const towers = _.filter(Game.structures, { structureType: STRUCTURE_TOWER });
	    for(let index in towers) {
	    	roleTower.run(towers[index]);
	    }

	    const CPU_used = Game.cpu.getUsed();
	    Memory.CPU_sum += CPU_used;
	    Memory.CPU_min = Math.min(Memory.CPU_min, CPU_used);
	    Memory.CPU_max = Math.max(Memory.CPU_max, CPU_used);

	    if(Game.time % 300 == 0) {
	        taskNotify.run();
	    }
	// });
}