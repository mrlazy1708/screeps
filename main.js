const profiler = require('screeps-profiler');
const taskAssign = require('task.assign');
const taskCreep = require('task.creep');
const taskExamine = require('task.examine');
const taskInit = require('task.init');
const taskReport = require('task.report');
const taskRoom = require('task.room');
const taskSpawn = require('task.spawn');
const taskStructure = require('task.structure');

//profiler.enable();

module.exports.loop = function () {
	// profiler.wrap(function() {
		taskInit.run();
		taskRoom.run();
		taskStructure.run();
		taskCreep.run();
		taskSpawn.run();

	    const CPU_used = Game.cpu.getUsed();
	    Memory.CPU_sum += CPU_used;
	    Memory.CPU_min = Math.min(Memory.CPU_min, CPU_used);
	    Memory.CPU_max = Math.max(Memory.CPU_max, CPU_used);

	    if(Game.time % 300 == 0) {
	        taskReport.run();
	    }
	// });
}