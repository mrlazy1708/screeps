const structureContainer = require('structure.container');
const structureExtension = require('structure.extension');
const structureTower = require('structure.tower');

const taskStructure = {
    run: function() {
        let structures = _.groupBy(Game.structures, (structure)=>{return structure.structureType;});
        for(let index in Memory.containers) {
            structureContainer.run(Game.getObjectById(Memory.containers[index]));
        }
        for(let id in structures[STRUCTURE_EXTENSION]) {
            structureExtension.run(structures[STRUCTURE_EXTENSION][id]);
        }
        for(let id in structures[STRUCTURE_TOWER]) {
            structureTower.run(structures[STRUCTURE_EXTENSION][id]);
        }
    }
};

module.exports = taskStructure;