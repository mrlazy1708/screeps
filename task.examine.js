const taskExamine = {
    run: function(room) {
        Memory.containers = [];
        for(let name in Game.rooms) {
            let room = Game.rooms[name], structures = room.find(FIND_STRUCTURES);

            room.memory.nExtension = 0;
            for(let index = 0; index < structures.length; index++) {
                const structure = structures[index];
                if(structure.memory.reserved == undefined) {
                    structure.memory.reserved = 0;
                }

                if(structure.structureType == STRUCTURE_EXTENSION) {
                    room.memory.nExtension++;
                }

                if(structure.structureType == STRUCTURE_CONTAINER) {
                    Memory.containers.push(structure.id);
                }
            }

            room.memory.capacity = room.memory.nExtension * EXTENSION_ENERGY_CAPACITY[room.controller.level];

            let spawns = room.find(FIND_MY_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType == STRUCTURE_SPAWN;
                }
            });
            room.memory.capacity += spawns.length * SPAWN_ENERGY_CAPACITY;

            let sources = room.find(FIND_SOURCES);
            room.memory.nSources = sources.length;

            room.memory.vExpect = sources.length?room.memory.nSources * sources[0].energyCapacity:0;//full load
        }
    }
};

module.exports = taskExamine;