const structureContainer = require('structure.container');
const structureExtension = require('structure.extension');
const structureTower = require('structure.tower');

const taskStructure = {
    run: function() {
        let structures = _.groupBy(Game.structures, (structure)=>{return structure.structureType;});
        for(let index = Memory.containers.length-1; index > 0; index--) {
            structureContainer.run(Game.getObjectById(Memory.containers[index]));
        }

        if(structures[STRUCTURE_EXTENSION] != undefined)
            for(let index = structures[STRUCTURE_EXTENSION].length-1; index > 0; index--) {
                structureExtension.run(structures[STRUCTURE_EXTENSION][index]);
            }
        if(structures[STRUCTURE_TOWER] != undefined)
        for(let index = structures[STRUCTURE_TOWER].length-1; index > 0; index--) {
            structureTower.run(structures[STRUCTURE_TOWER][index]);
        }
    }
};

module.exports = taskStructure;