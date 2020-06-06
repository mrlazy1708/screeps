const structureContainer = {
    run: function(container) {
        let sum = container.memory.reserved - container.store[RESOURCE_ENERGY];
        if(sum < -100) {
            global.sources.insert({.time: 1, .pri: sum, .hostID: container.id});
        }
    }
};

module.exports = structureContainer;