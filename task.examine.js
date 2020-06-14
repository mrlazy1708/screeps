const taskExamine = {
    run: function() {
        Memory.containers = [];
        for(let name in Game.rooms) {
            let room = Game.rooms[name], structures = room.find(FIND_STRUCTURES);

            room.memory.nExtension = 0;
            room.memory.containers = [];
            for(let index = 0; index < structures.length; index++) {
                const structure = structures[index];
                if(structure.memory.reserved == undefined) {
                    structure.memory.reserved = 0;
                }

                if(structure.structureType == STRUCTURE_EXTENSION) {
                    room.memory.nExtension++;
                }

                if(structure.structureType == STRUCTURE_CONTAINER) {
                    room.memory.containers.push(structure.id);
                }
            }

            room.memory.capacity = SPAWN_ENERGY_CAPACITY + room.memory.nExtension * EXTENSION_ENERGY_CAPACITY[room.controller.level];

            room.memory.vExpect = room.memory.containers.length * 10;//full load
            
            if(room.memory.nHarvester == undefined) {
                room.memory.nHarvester = 0;
            }

            if(room.memory.vConsume == undefined) {
                room.memory.vConsume = 0;
            }
        }
    }
};

module.exports = taskExamine;