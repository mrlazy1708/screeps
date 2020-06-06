const pq = require('priority_queue');

const structureExtension = {
    run: function(extension) {
        let sum = extension.memory.reserved - extension.store.getFreeCapacity(RESOURCE_ENERGY);
        if(sum < 0) {
            pq.insert(global.collect, {time: 1, pri: sum, hostID: extension.id});
        }
    }
};

module.exports = structureExtension;