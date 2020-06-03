const taskExamine = {
    run: function(room) {
        room.memory.nExtension = 0;
        room.memory.nContainer = 0;

        const structures = room.find(FIND_MY_STRUCTURES);
        for(let index in structures) {
            const structure = structures[index];

            if(structure.structureType == STRUCTURE_EXTENSION) {
                room.memory.nExtension++;
            }

            if(structure.structureType == STRUCTURE_CONTAINER) {
                room.memory.nContainer++;
            }
        }
    }
};

module.exports = taskExmaine;