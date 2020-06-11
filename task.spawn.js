const roleSpawn = require('role.spawn');

const taskSpawn = {
    run: function() {
        for(let name in Game.rooms) {
            let room = Game.rooms[name];
            if(room.memory.nHarvester < room.memory.nSources) {
                global.task.spawn.Push({time: 1, pri: room.memory.nHarvester - room.memory.nSources, disc: {role: 'harvester', home: room.name}});
            }

            if(room.memory.vConsume < room.memory.vExpect) {
                global.task.spawn.Push({time: 3, pri: room.memory.vContume - room.memory.vExpect, disc: {role: 'worker', home: room.name}});
            }

            if(room.nCourier.free == 0) {
                global.task.spawn.Push({time: 2, pri: 0, disc: {role: 'harvester', home: room.name}});
            }
        }

        let idleSpawn = _.filter(Game.spawns, (spawn)=>{return spawn.memory.task == null});
        if(idleSpawn != undefined) {
            for(let task; (task = global.task.spawn.Top()) != undefined && task.time <= Game.time; ) {
                let index = (new RoomPosition(25, 25, task.disc.home)).Find(idleSpawn.id);
                if(index != null) {
                    let spawn = Game.getObjectById(idleSpawn[index]);
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
                roleSpawn.run(spawn);
            }
        }
	}
};

module.exports = taskSpawn;