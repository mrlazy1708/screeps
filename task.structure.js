const structureContainer = require('structure.container');
const structureExtension = require('structure.extension');
const structureTower = require('structure.tower');

const taskStructure = {
    run: function() {
        for(let id in Game.structures) {
            let structure = Game.structures[id];
            structure.sample();
            if(structure.structureType == STRUCTURE_EXTENSION) {
                structureExtension.run(structure);
            }

            if(structure.structureType == STRUCTURE_TOWER) {
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