const roleSpawn = {
    run: function(spawn) {
        if(spawn.memory.task.role == 'courier') {
        	let body = [CARRY, MOVE];
        	if(spawn.spawnCreep(body, 'lazyCourier_' + Game.time, {memory: {role: 'courier', home: spawn.memory.task.home, state: 'travel', reserved: 0}}) == OK) {
                spawn.memory.task = null;
            }
        }

        if(spawn.memory.task.role == 'harvester') {
        	let i, body = [];
        	for(i = 0; i * 250 < spawn.room.memory.capacity && i < 5; i++) {
        		body.push(WORK);
        		body.push(WORK);
        		body.push(MOVE);
        	}
        	if(spawn.spawnCreep(body, 'lazyHarvester_' + Game.time, {memory: {role: 'harvester', home: spawn.memory.task.home, state: 'travel', num: 1}}) == OK) {
                Game.rooms[spawn.memory.task.home].memory.nHarvester++;
                spawn.memory.task = null;
            }
        }

        if(spawn.memory.task.role == 'worker') {
        	let i, body = [];
        	for(i = 0; i * 200 < spawn.room.memory.capacity; i++) {
        		body.push(WORK);
        		body.push(CARRY);
        		body.push(MOVE);
        	}
         	if(spawn.spawnCreep(body, 'lazyWorker_' + Game.time, {memory: {role: 'worker', home: spawn.memory.task.home, state: 'travel', reserved: 0, num: 0, work: 'jack'}}) == OK) {
                spawn.memory.task = null;
            }
       }
	}
};

module.exports = roleSpawn;