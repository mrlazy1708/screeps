var roleTower = require('role.tower');
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
	var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
            return object.structureType == STRUCTURE_TOWER;
        }
    });
    for(var index in towers) {
    	roleTower.run(towers[index]);
    }
    if(Game.time % 300 == 0) {
        taskNotify.run();
    }
}