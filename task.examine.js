const taskExamine = {
    run: function(room) {
        const structures = room.find(FIND_STRUCTURES);
        Memory.containers = [];
        for(let index in structures) {
            const structure = structures[index];
            if(structure.structureType == STRUCTURE_EXTENSION) {
                if(structure.memory.reserved = undefined) {
                    structure.memory.reserved = 0;
                }
            }
            if(structure.structureType == STRUCTURE_CONTAINER) {
                if(structure.memory.reserved == undefined) {
                    structure.memory.reserved = 0;
                }
                Memory.containers.push(structure.id);
            }
        }
    }
};

module.exports = taskExamine;