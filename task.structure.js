const structureContainer = require('structure.container');
const structureTower = require('structure.tower');

const taskStructure = {
    run: function() {
        let structures = _.groupBy(Game.structures, (structure)=>{return structure.structureType;});
        for(let index in Memory.containers) {
        	let container = Game.getObjectById(Memory.containers[index]);
            structureContainer.run(container);
        }
        for(let id in structures[STRUCTURE_TOWER]) {
            structureTower.run(Game.structures[id]);
        }
    }
};

module.exports = taskStructure;