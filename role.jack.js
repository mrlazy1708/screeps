const roleJack = {
    run: function(creep) {

        if(creep.memory.state == 'get') {
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.state = 'give';
            }
            else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }

        if(creep.memory.state == 'give') {
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.state = 'get';
            }
            else {
                let target = creep.room.find(FIND_MY_SPAWNS, {
                    filter: function(object) {
                        return object.store.getFreeCapacity(RESOURCE_ENERGY) != 0;
                    }
                });
                if(target == null) {
                    target = creep.room.find(FIND_STRUCTURES, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_EXTENSION && object.store.getFreeCapacity(RESOURCE_ENERGY) != 0;
                        }
                    });
                }
                if(target != null) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        console.log(target.pos);
                    }
                }
            }
        }
    }
};

module.exports = roleJack;
