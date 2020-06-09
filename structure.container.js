const structureContainer = {
    run: function(container) {
    	if(!container.memory.wait && container.store[RESOURCE_ENERGY] > container.memory.reserved) {
			container.memory.wait = true;
            Memory.task.sources.Insert({time: Game.time*2 - container.memory.time, pri: 2, hostID: container.id});
            contianer.memory.time = Game.time;
    	}
    }
};

module.exports = structureContainer;