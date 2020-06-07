const pq = require('priority_queue');
const roleSpawn = require('role.spawn');

const taskSpawn = {
    run:function() {
        for(let name in Game.spawns) {
            let spawn = Game.spawns[name];
            if(!spawn.spawning) {
                room.idleSpawns.push(spawn);
            }
            let sum = spawn.memory.reserved - spawn.store.getFreeCapacity(RESOURCE_ENERGY);
            if(sum < -20) {
                pq.insert(global.collect, {time: 1, pri: sum, hostID: spawn.id});
            }
        }
        for(let name in Game.rooms) {
            let room = Game.rooms[name], spawns = room.idleSpawns;
            for(let name in spawns) {
                const task = pq.top(room.memory.spawnQ);
                if(task != undefined) {
                    if(roleSpawn.run(spawns[spawnName], task.role, task.home, task.work) == OK) {
                        pq.remove(room.memory.spawnQ);
                        console.log(spawn.name + ' is spawning ' + task.role + ' to room' + task.home);
                    }
                }
                else {
                    break;
                }
            }
        }

	}
};

module.exports = taskSpawn;