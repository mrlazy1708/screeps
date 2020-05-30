var taskBuild = require('task.build');
var taskInit = require('task.init');
var taskNotify = require('task.notify');
var taskUpgrade = require('task.upgrade');

module.exports.loop = function () {
	taskInit.run();
	var constructionSites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
	if(constructionSites.length) {
		taskBuild.run();
	}
	else {
    	taskUpgrade.run();
	}
    if(Game.time % 300 == 0) {
        taskNotify.run();
    }
}