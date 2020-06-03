const profiler = require('screeps-profiler');
const roleTower = require('role.tower');
const taskCreep = require('task.creep');
const taskExamine = require('task.examine');
const taskInit = require('task.init');
const taskNotify = require('task.notify');

profiler.enable();

module.exports.loop = function () {
	profiler.wrap(function() {
		taskInit.run();

		for(let name in Game.rooms) {
			let room = Game.rooms[name];
			const enemys = room.find(FIND_HOSTILE_CREEPS);
			if(enemys.length) {
				if(!room.memory.invaded) {
					room.memory.invaded = true;
					Memory.message += Game.time+': '+enemys.length+' creep '+(enemys.length==1?'':'s')+' of '+enemys[0].owner.username+' found in '+room.name+'\n';
					console.log('Room '+room.name+'is under attack!');
				}
				enemys.forEach(function(object) {
					let victims = object.pos.findInRange(FIND_MY_CREEPS, 5, {
						filter: function(object) {
							return object.painc != Game.time;
						}
					});
					victims.forEach(function(creep) {
						const path = PathFinder.search(creep.pos, enemys.map(object=>{return{pos: object.pos, range: 5}}), {flee: true}).path;
						creep.move(path[0].direction);
						creep.memory.panic = Game.time;
						creep.say('🐥');
					});
				});
			}
			else {
				if(room.memory.invaded) {
					room.memory.invaded = false;
					taskExamine.run(room);
					console.log('Enemys slayed in room '+room.name+' !');
				}
			}
		}

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
	});
}