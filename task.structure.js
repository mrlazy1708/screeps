const structureContainer = require('structure.container');
const structureExtension = require('structure.extension');
const structureTower = require('structure.tower');

const taskStructure = {
    run: function() {
        for(let id in Game.structures) {
            let structure = Game.structures[id];
            if(structure.structureType == STRUCTURE_SPAWN) {
                structure.sample();
                let sum = structure.memory.reserved - structure.store.getFreeCapacity(RESOURCE_ENERGY);
                if(sum < 0) {
                    global.task.collect.Push({time: 0, pri: sum, hostID: structure.id});
                }
            }

            if(structure.structureType == STRUCTURE_EXTENSION) {
                structure.sample();
                structureExtension.run(structure);
            }

            if(structure.structureType == STRUCTURE_TOWER) {
                structure.sample();
                structureTower.run(structure);
            }
        }

        for(let name in Game.rooms) {
            let room = Game.rooms[name];
            for(let index = room.memory.containers.length-1; index >= 0; index--) {
                let structure = Game.getObjectById(room.memory.containers[index]);
                structure.sample();
                structureContainer.run(structure);
            }
        }
    }
};

module.exports = taskStructure;