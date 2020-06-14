const roleSpawn = require('role.spawn');

const taskSpawn = {
    run: function() {
        let idleSpawn = _.filter(Game.spawns, (spawn)=>{return spawn.memory.task == null});
        if(idleSpawn != undefined) {
            for(let task; (task = global.task.spawn.Top()) != undefined && task.time <= Game.time; ) {
                let index = (new RoomPosition(25, 25, task.disc.home)).Find(idleSpawn);
                if(index != undefined) {
                    let spawn = idleSpawn[index];
                    idleSpawn.Delete(index);
                    global.task.spawn.Pop();
                    spawn.memory.task = task.disc;
                }
                else break;
            }
        }

        for(let name in Game.spawns) {
            let spawn = Game.spawns[name];
            if(!spawn.spawning && spawn.memory.task != null) {
                if(roleSpawn.run(spawn)) {
                    spawn.memory.task = null;
                }
            }
        }
    }
};

module.exports = taskSpawn;