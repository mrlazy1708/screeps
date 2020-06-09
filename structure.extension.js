const structureExtension = {
    run: function(extension) {
        if(!extension.memory.wait && extension.store.getFreeCapacity[RESOURCE_ENERGY] > extension.memory.reserved) {
            extension.memory.wait = true;
            Memory.task.collect.Insert({time: Game.time*2 - extension.memory.time, pri: 2, hostID: extension.id});
            extension.memory.time = Game.time;
        }
    }
};

module.exports = structureExtension;