const profiler = require('screeps-profiler');
const taskAssign = require('task.assign');
const taskCreep = require('task.creep');
const taskExamine = require('task.examine');
const taskInit = require('task.init');
const taskReport = require('task.report');
const taskRoom = require('task.room');
const taskSpawn = require('task.spawn');
const taskStructure = require('task.structure');

const taskDesign = require('task.design');

//profiler.enable();

module.exports.loop = function () {
	// profiler.wrap(function() {
		taskDesign.run(Game.rooms['sim']);
		// taskInit.run();
		// taskRoom.run();
		// taskStructure.run();
		// taskCreep.run();
		// taskSpawn.run();
		// taskAssign.run();
		// taskReport.run();
		// taskExamine.run();
	// });
}