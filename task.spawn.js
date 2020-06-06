const pq = require('priority_queue');
const roleSpawn = require('role.spawn');

const taskSpawn = {
    run:function() {
        const idleSpawns = _.groupBy(_.filter(Game.spawns, (c)=>{return !c.spawning}), (c)=>{return c.room.name});
        for(let roomName in Game.rooms) {
            let room = Game.rooms[roomName], spawns = idleSpawns[roomName];
            for(let spawnName in spawns) {
                const task = pq.top(room.memory.spawnQ);
                if(task != undefined) {
                    if(task !=roleSpawn.run(spawns[spawnName], task.role, task.home, task.work)) {
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