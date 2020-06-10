const structureContainer = require('structure.container');
const structureExtension = require('structure.extension');
const structureTower = require('structure.tower');

const taskStructure = {
    run: function() {
        for(let id in Game.structures) {
            let structure = Game.structures[id];
            if(structure.structureType == STRUCTURE_EXTENSION) {
                structure.sample();
                structureExtension.run(structure);
            }

            if(structure.structureType == STRUCTURE_TOWER) {
                structure.sample();
                structureTower.run(structure);
            }
        }

        for(let index = Memory.containers.length-1; index >= 0; index--) {
            let structure = Game.getObjectById(Memory.containers[index]);
            structure.sample();
            structureContainer.run(structure);
        }
    }
};

module.exports = taskStructure;