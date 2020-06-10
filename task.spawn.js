const roleSpawn = require('role.spawn');

const taskSpawn = {
    run: function() {
        for(let task; (task = Memory.task.spawn.Top()) != undefined && task.time <= Game.time; ) {
            let index = task.pos.Find(Memory.idleSpawn);
            if(index != null) {
                let spawn = Game.getObjectById(Memory.idleSpawn[index]);
                Memory.idleSpawn.Delete(index);
                if(spawn) {
                    Memory.task.spawn.Pop();
                    spawn.memory.task = task.disc;
                }
            }
            else break;
        }

        for(let name in Game.spawns) {
            let spawn = Game.spawns[name];
            if(!spawn.spawning && roleSpawn.run(spawn) == OK) {
                spawn.memory.task = null;
                Memory.idleSpawn.Push(spawn.id);
            }
        }
	}
};

module.exports = taskSpawn;