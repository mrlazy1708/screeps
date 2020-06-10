const roleSpawn = require('role.spawn');

const taskSpawn = {
    run: function() {
        let idleSpawn = _.filter(Game.spawns, (spawn)=>{return !spawn.spawning});
        for(let task; (task = Memory.task.spawn.Top()) != undefined && task.time <= Game.time; ) {
            let index = task.pos.Find(idleSpawn);
            if(index != null) {
                let spawn = Game.getObjectById(idleSpawn[index]);
                idleSpawn.Delete(index);
                if(spawn) {
                    Memory.task.spawn.Pop();
                    spawn.memory.task = task.disc;
                }
            }
            else break;
        }

        for(let name in Game.spawns) {
            let spawn = Game.spawns[name];
            if(!spawn.spawning && spawn.memory.task != null && roleSpawn.run(spawn) == OK) {
                spawn.memory.task = null;
            }
        }
	}
};

module.exports = taskSpawn;