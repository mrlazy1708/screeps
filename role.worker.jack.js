const roleWorkerJack = {
    run: function(creep) {
        if(creep.memory.state == 'idle') {
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.state = 'get';
            }
            else {
                creep.memory.state = 'give';
            }
        }

        if(creep.memory.state == 'get') {
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.state = 'give';
            }
            else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                    creep.say('🎯', true);
                }
                else {
                    creep.say('🚨', true);
                }
            }
        }

        if(creep.memory.state == 'give') {
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.state = 'get';
            }
            else {
                let target = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
                    filter: function(object) {
                        return object.store.getFreeCapacity(RESOURCE_ENERGY) != 0;
                    }
                });
                if(target == null) {
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_EXTENSION && object.store.getFreeCapacity(RESOURCE_ENERGY) != 0;
                        }
                    });
                    if(target == null) {
                        target = creep.room.controller;
                    }
                }
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say('🎯', true);
                }
                else {
                    creep.say('⚙️', true);
                }
            }
        }
    }
};

module.exports = roleWorkerJack;