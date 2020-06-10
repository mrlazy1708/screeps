const structureContainer = {
    run: function(container) {
	    if(!container.memory.wait) {
	        let sum = container.memory.reserved - container.store[RESOURCE_ENERGY];
	        if(sum < 0) {
	            container.memory.wait = true;
	            Memory.task.sources.Push({time: Game.time*2 - container.memory.time, pri: sum, hostID: container.id});
	            container.memory.time = Game.time;
	        }
	    }
    }
};

module.exports = structureContainer;