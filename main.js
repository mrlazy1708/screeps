var roleTower = require('role.tower');
var taskDefense = require('task.defense');
var taskInit = require('task.init');
var taskNotify = require('task.notify');
var taskUpgrade = require('task.upgrade');

module.exports.loop = function () {

	taskInit.run();

	for(var name in Game.rooms) {
		var room = Game.rooms[name];
		var enemys = room.find(FIND_HOSTILE_CREEPS);
		if(enemys.length) {
			if(!room.memory.attack) {
				room.memory.attack = true;
				Memory.message += Game.time+': '+enemys.length+' creep'+(enemys.length==1?'':'s')+' of '+enemys[0].owner.username+(enemys.length==1?' was':' were')+' spotted in '+room.name+'\n';
				console.log('Under attack!');
			}
			taskDefense.run(enemys);
		}
		else {
			if( room.memory.attack) {
				room.memory.attack = false;
				console.log('Enemy slayed!');
			}
			taskUpgrade.run();
		}
	}
	
	var towers = _.filter(Game.structures, { structureType: STRUCTURE_TOWER });
    for(var index in towers) {
    	roleTower.run(towers[index]);
    }

    var CPU_used = Game.cpu.getUsed();
    Memory.CPU_sum += CPU_used;
    Memory.CPU_min = Math.min(Memory.CPU_min, CPU_used);
    Memory.CPU_max = Math.max(Memory.CPU_max, CPU_used);

    if(Game.time % 300 == 0) {
    	var newStructures = _.filter(Game.structures, function(object) {
    		return object.memory.reserved == undefined;
    	});
	    for(var index in newStructures) {
	    	newStructures[index].memory.reserved = 0;
	    }
        taskNotify.run();
    }
}