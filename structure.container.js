const structureContainer = {
    run: function(container) {
        let sum = container.memory.reserved - container.store[RESOURCE_ENERGY];
        if(sum < 0) {
            global.task.sources.Push({time: 1, pri: sum, hostID: container.id});
        }
    }
};

module.exports = structureContainer;