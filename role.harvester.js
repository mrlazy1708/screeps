var roleHarvester = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);
        if(creep.memory.state == 'idle') {
            creep.say('💤');
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: {structureType: STRUCTURE_CONTAINER}
            });
            for(var index in containers) {
                if(Game.getObjectById(containers[index].memory.hostID) == null) {
                    target = containers[index].pos.findClosestByRange(FIND_SOURCES);
                    containers[index].memory.hostID = creep.id;
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
                creep.say('🎯');
                creep.move(path[0].direction);
            }
            else {
                creep.memory.state = 'work';
            }
        }
        
        if(creep.memory.state == 'work') {
            if(!target) {
                creep.memory.state = 'idle';
            }
            else {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.memory.state = 'arrive';
                }
                else {
                    creep.say('🚨️️');
                }
            }
        }
    }
};

module.exports = roleHarvester;