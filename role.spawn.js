const roleSpawn = {
    run: function(spawn, _role, _home, _work) {
        const capacity = 300 + spawn.room.memory.nExtension * EXTENSION_ENERGY_CAPACITY[spawn.room.controller.level];
        if(_role == 'courier') {
        	let body = [CARRY, CARRY, MOVE];
        	return spawn.spawnCreep(body, 'lazyCourier_' + Game.time, {memory: {role: _role, home: _home, state: 'travel', reserved: 0}});
        }
        if(_role == 'harvester') {
        	let body = [];
        	for(let i = 0; i * 250 < capacity && i < 5; i++) {
        		body.push(WORK);
        		body.push(WORK);
        		body.push(MOVE);
        	}
        	return spawn.spawnCreep(body, 'lazyHarvester_' + Game.time, {memory: {role: _role, home: _home, state: 'travel'}});
        }
        if(_role == 'worker') {
        	let body = [];
        	for(let i = 0; i * 200 < capacity; i++) {
        		body.push(WORK);
        		body.push(CARRY);
        		body.push(MOVE);
        	}
         	return spawn.spawnCreep(body, 'lazyWorker_' + Game.time, {memory: {role: _role, work: _work, home: _home, state: 'travel', reserved: 0}});
       }
	}
};

module.exports = roleSpawn;