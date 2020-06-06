const taskReconfig = {
    run: function(room) {
        // room.memory

        room.memory.nCourier = 0;
        room.memory.nHarvester = 0;
        room.memory.nWorker = 0;
        room.memory.nJack = 0;
        const creeps = room.find(FIND_MY_CREEPS);
        for(let name in creeps) {
            const creep = creeps[name];

            if(creep.memory.role == 'courier') {
                room.memory.nCourier++;
            }
            
            if(creep.memory.role == 'harvester') {
                room.memory.nHarvester++;
            }
            
            if(creep.memory.role == 'worker') {
                room.memory.nWorker++;
            }
            
            if(creep.memory.role == 'jack') {
                room.memory.nJack++;
            }
        }

        const sources=room.find(FIND_SOURCES);
        room.memory.nSource=sources.length;
    }
};

module.exports = taskReconfig;