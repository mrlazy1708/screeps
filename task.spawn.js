const roleSpawn = require('role.spawn');

const taskSpawn = {
    run:function() {
        const idleSpawns = _.groupBy(_.filter(Game.spawns, (c)=>{return !c.spawning}), (c)=>{return c.room.name});
        for(let roomName in Game.rooms) {
            let room = Game.rooms[rooMName], spawns = idleSpawns[roomName];
            for(let spawnName in spawns) {
                const task = room.memory.q.top();
                if(roleSpawn.run(spawns[spawnName], task.role, task.home, task.work)) {
                    room.memory.q.remove();
                    console.log(spawn.name + ' is spawning ' + task.role + ' to room' + task.home);
                }
            }
        }

	}
};

module.exports = taskSpawn;