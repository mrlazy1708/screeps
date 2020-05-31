var roleTower = require('role.tower');
var taskBuild = require('task.build');
var taskDefense = require('task.defense');
var taskInit = require('task.init');
var taskNotify = require('task.notify');
var taskUpgrade = require('task.upgrade');

module.exports.loop = function () {
	taskInit.run();
	if(Memory.reset == true) {
		var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
	        filter: {structureType: STRUCTURE_EXTENSION}
	    });
	    for(var index in extensions) {
	    	extensions[index].memory.reserved = 0;
	    }
	    console.log('Execute reset');
	    Memory.reset = false;
	}
	var enemys = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
	if(enemys.length) {
		console.log('Under attack!');
		taskDefense.run(enemys);
		if(!Game.spawns['Spawn1'].memory.attack) {
			Game.spawns['Spawn1'].memory.attack = true;
			Memory.message += Game.time+': '+enemys.length+' creep'+(enemys.length==1?'':'s')+'owned by '+enemys[0].owner+(enemys.length==1?' was':' were')+' spotted in room '+Game.spawns['Spawn1'].room.name+'\n';
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