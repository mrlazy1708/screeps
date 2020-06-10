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
	taskExamine.run();
	// profiler.wrap(function() {
		taskInit.run();
		taskRoom.run();
		taskAssign.run();
		taskCreep.run();
		taskSpawn.run();
		taskStructure.run();
	// });
	taskReport.run();
}