const structureExtension = {
    run: function(extension) {
	    if(!extension.memory.wait) {
	        let sum = extension.memory.reserved - extension.store.getFreeCapacity(RESOURCE_ENERGY);
	        if(sum < 0) {
	        	console.log(extension.id);
	        	console.log(sum);
	            extension.memory.wait = true;
	            Memory.task.collect.Push({time: Game.time*2 - extension.memory.time, pri: sum, hostID: extension.id});
	            extension.memory.time = Game.time;
	        }
	    }
    }
};

module.exports = structureExtension;