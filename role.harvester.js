var roleHarvester = {
    run: function(creep) {

        if(creep.memory.state == 'idle') {
            creep.say('💤');
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: {structureType: STRUCTURE_CONTAINER}
            });
            for(var index in containers) {
                if(Game.getObjectById(containers[index].memory.host) == null) {
                    creep.memory.targetID = containers[index].pos.findClosestByRange(FIND_SOURCE).id;
                    creep.memory.state = 'work';
                    break;
                }
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store.getFreeCapacity() > 0) {
                var target = Game.getObjectById(creep.memory.targetID);
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