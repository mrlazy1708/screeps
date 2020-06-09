const roleSpawn = {
    run: function(spawn) {
        const capacity = 300 + spawn.room.memory.nExtension * EXTENSION_ENERGY_CAPACITY[spawn.room.controller.level];
        if(spawn.memory.task.role == 'courier') {
        	let body = [CARRY, CARRY, MOVE];
        	return spawn.spawnCreep(body, 'lazyCourier_' + Game.time, {memory: {role: 'courier', home: spawn.memory.task.home, state: 'travel', reserved: 0}});
        }

        if(spawn.memory.task.role == 'harvester') {
        	let body = [];
        	for(let i = 0; i * 250 < capacity && i < 5; i++) {
        		body.push(WORK);
        		body.push(WORK);
        		body.push(MOVE);
        	}
        	return spawn.spawnCreep(body, 'lazyHarvester_' + Game.time, {memory: {role: 'harvester', home: spawn.memory.task.home, state: 'travel'}});
        }

        if(spawn.memory.task.role == 'worker') {
        	let body = [];
        	for(let i = 0; i * 200 < capacity; i++) {
        		body.push(WORK);
        		body.push(CARRY);
        		body.push(MOVE);
        	}
         	return spawn.spawnCreep(body, 'lazyWorker_' + Game.time, {memory: {role: 'worker', home: spawn.memory.task.home, state: 'travel', reserved: 0, work: spawn.memory.task.work}});
       }
	}
};

module.exports = roleSpawn;