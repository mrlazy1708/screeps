const structureContainer = {
    run: function(container) {
        if(container.memory.reserved == undefined) {
            container.memory.reserved = 0;
        }
        let sum = container.memory.reserved - container.store[RESOURCE_ENERGY];
        if(sum < -100) {
            global.sources.insert({time: 1, pri: sum, hostID: container.id});
        }
    }
};

module.exports = structureContainer;