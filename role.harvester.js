var roleHarvester = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);
        if(creep.memory.state == 'idle') {
            var freeContainers = creep.room.findc cc cc(FIND_STRUCTURES, filter: function(object){
                return object.structureType == STRUCTURE_CONTAINER && Game.getObjectById(object.memory.hostID) == null;
            });
            if(freeContainers.length > 0) {
                target = freeContainers[0].pos.findClosestByRange(FIND_SOURCES);
                freeContainers[0].memory.hostID = creep.id;
                creep.memory.containerID = freeContainers[0].id;
                creep.memory.targetID = target.id;
                creep.memory.state = 'arrive';
            }
            else {
                creep.say('💤');
            }
        }

        if(creep.memory.state == 'arrive') {
            const path = creep.pos.findPathTo(Game.getObjectById(creep.memory.containerID));
            if(path.length > 0) {
                creep.move(path[0].direction);
                creep.say('🎯');
            }
            else {
                creep.memory.state = 'work';
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.memory.state = 'arrive';
            }
            else {
                creep.say('🚨️️');
            }
        }
    }
};

module.exports = roleHarvester;