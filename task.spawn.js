const roleSpawn = require('role.spawn');

const taskSpawn = {
    run: function() {
        for(let task; (task = Memory.task.spawn.Top()) != undefined && task.time <= Game.time; ) {
            let index = task.pos.Find(spawns);
            if(index != null) {
                let spawn = spawns[index];
                nDelete(spawns, index);
                Memory.task.spawn.Pop();
                spawn.memory.disc = task.disc;
            }
            else break;
        }

        for(let name in Game.spawns) {
            let spawn = Game.spawns[name] {
            if(!spawn.spawning && roleSpawn.run(spawn) == OK) {
                spawn.memory.task = null;
            }
        }
	}
};

module.exports = taskSpawn;