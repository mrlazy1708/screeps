var roleHarvester = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);
        if(creep.memory.state == 'idle') {
            creep.say('💤');
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: {structureType: STRUCTURE_CONTAINER}
            });
            for(var index in containers) {
                if(Game.getObjectById(containers[index].memory.host) == null) {
                    target = containers[index].pos.findClosestByRange(FIND_SOURCES);
                    creep.memory.containerID = containers[index].id;
                    creep.memory.targetID = target.id;
                    creep.memory.state = 'arrive';
                    break;
                }
            }
        }

        if(creep.memory.state == 'arrive') {
            const path = creep.pos.findPathTo(Game.getObjectById(creep.memory.containerID));
            if(path.length > 0) {
                creep.move(path[0].direction);
            }
            else {
                creep.memory.state = 'work';
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store.getFreeCapacity() > 0) {
                if(!target) {
                    creep.memory.state = 'idle';
                }
                else {
                    if( creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🎯');
                    }
                    else {
                        creep.say('🚨️️');
                    }
                }
            }
            else {
                creep.say('🍺');
                creep.drop(RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleHarvester;