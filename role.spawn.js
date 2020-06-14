const roleSpawn = {
    run: function(spawn) {
        if(spawn.memory.task.role == 'courier') {
            let body = [CARRY, MOVE];
            if(spawn.spawnCreep(body, 'lazyCourier_' + Game.time, {memory: {role: 'courier', home: spawn.memory.task.home, state: 'travel', reserved: 0}}) == OK) {
                Game.rooms[spawn.memory.task.home].memory.nIdle++;
                return true;
            }
        }

        if(spawn.memory.task.role == 'harvester') {
            let i, body = [];
            for(i = 1; i * 250 < spawn.room.memory.capacity && i < 5; i++) {
                body.push(WORK);
                body.push(WORK);
                body.push(MOVE);
            }
            if(spawn.spawnCreep(body, 'lazyHarvester_' + Game.time, {memory: {role: 'harvester', home: spawn.memory.task.home, state: 'travel', num: 1}}) == OK) {
                Game.rooms[spawn.memory.task.home].memory.nHarvester++;
                return true;
            }
        }

        if(spawn.memory.task.role == 'worker') {
            let i, body = [];
            for(i = 1; i * 200 < spawn.room.memory.capacity; i++) {
                body.push(WORK);
                body.push(CARRY);
                body.push(MOVE);
            }
            if(spawn.spawnCreep(body, 'lazyWorker_' + Game.time, {memory: {role: 'worker', home: spawn.memory.task.home, state: 'travel', reserved: 0, num: 0, work: 'jack'}}) == OK) {
                Game.rooms[spawn.memory.task.home].memory.nJack++;
                return true;
            }
       }
       
       return false;
    }
};

module.exports = roleSpawn;