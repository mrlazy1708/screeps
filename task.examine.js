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
        }
    }
};

module.exports = taskExamine;