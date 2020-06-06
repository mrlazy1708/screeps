const pq = require('priority_queue');

const structureExtension = {
    run: function(extension) {
        if(extension.memory.reserved == undefined) {
            extension.memory.reserved = 0;
        }
        let sum = extension.memory.reserved - extension.store[RESOURCE_ENERGY];
        if(sum < -100) {
            pq.insert(global.collect, {time: 1, pri: sum, hostID: extension.id});
        }
    }
};

module.exports = structureExtension;