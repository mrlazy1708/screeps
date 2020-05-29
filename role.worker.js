var roleWorker = {
    run: function (creep) {
        if(creep.store.getFreeCapacity() != 0) {
            var target = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: function(structure) { return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN ) && structure.store.getFreeCapacity(RESOURCE_ENERGY) != 0; } });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
        }
    }
}

module.exports = roleWorker;