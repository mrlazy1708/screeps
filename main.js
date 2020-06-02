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
		taskDefense.run(enemys);
		if(!Game.spawns['Spawn1'].memory.attack) {
			Game.spawns['Spawn1'].memory.attack = true;
			Memory.message += Game.time+': '+enemys.length+' creep '+(enemys.length==1?'':'s')+' of '+enemys[0].owner.username+(enemys.length==1?' was':' were')+' spotted in '+Game.spawns['Spawn1'].room.name+'\n';
			console.log('Under attack!');
		}
	}
	else {
		if(Game.spawns['Spawn1'].memory.attack) {
			Game.spawns['Spawn1'].memory.attack = false;
			console.log('Enemy slayed!');
		}
		taskUpgrade.run();
	}

	var towers = _.filter(Game.structure, { structureType: STRUCTURE_TOWER });
    for(var index in towers) {
    	roleTower.run(towers[index]);
    }

    var CPU_used = Game.cpu.getUsed();
    Memory.CPU_sum += CPU_used;
    Memory.CPU_min = Math.min(Memory.CPU_min, CPU_used);
    Memory.CPU_max = Math.max(Memory.CPU_max, CPU_used);

    if(Game.time % 300 == 0) {
        taskNotify.run(enemys);
    }
}