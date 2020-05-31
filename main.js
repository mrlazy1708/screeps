var roleTower = require('role.tower');
var taskBuild = require('task.build');
var taskDefense = require('task.defense');
var taskInit = require('task.init');
var taskNotify = require('task.notify');
var taskUpgrade = require('task.upgrade');

module.exports.loop = function () {

	taskInit.run();

	var newExtensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
        	return object.structureType == STRUCTURE_EXTENSION && object.memory.reserved == undefined;
        }
    });
    for(var index in newExtensions) {
    	newExtensions[index].memory.reserved = 0;
    	console.log('extension #'+newExtensions[index].id+' is built');
    }

	var enemys = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
	if(enemys.length) {
		console.log('Under attack!');
		taskDefense.run(enemys);
		if(!Game.spawns['Spawn1'].memory.attack) {
			Game.spawns['Spawn1'].memory.attack = true;
			Memory.message += Game.time+': '+enemys.length+' creep '+(enemys.length==1?'':'s')+' owned by '+enemys[0].owner.name+(enemys.length==1?' was':' were')+' spotted in '+Game.spawns['Spawn1'].room.name+'\n';
		}
	}
	else {
		Game.spawns['Spawn1'].memory.attack = false;
		var constructionSites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
		if(constructionSites.length) {
			console.log('task: build');
			taskBuild.run();
		}
		else {
			console.log('task: upgrade');
	    	taskUpgrade.run();
		}
	}

	var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_TOWER}
    });
    for(var index in towers) {
    	roleTower.run(towers[index]);
    }

    if(Game.time % 300 == 0) {
        taskNotify.run(enemys);
    }
}