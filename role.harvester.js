var roleHarvester = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);
        if(creep.memory.state == 'idle') {
            /*var room = Game.getObjectById(creep.memory.roomID);
            if(creep.room == room) {*/
                var freeContainers = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_CONTAINER && Game.getObjectById(object.memory.hostID) == null;
                    }
                });
                if(freeContainers.length > 0) {
                    target = freeContainers[0].pos.findClosestByRange(FIND_SOURCES);
                    freeContainers[0].memory.hostID = creep.id;
                    console.log(freeContainers[0].memory.hostID);
                    creep.memory.containerID = freeContainers[0].id;
                    creep.memory.targetID = target.id;
                }/*
                else {
                    target = creep.room.findClosestByPath(FIND_SOURCES);
                    creep.memory.targetID = target.id;
                }
            }
            else {
                const route = Game.map.findRoute(creep.room, room);
                target = creep.pos.findClosestByPath(route[0].exit);
            }*/
            creep.memory.state = 'arrive';
        }

        if(creep.memory.state == 'arrive') {
            var container = Game.getObjectById(creep.memory.containerID);
            if(container) {
                const path = creep.pos.findPathTo(container);
                if(path.length > 0) {
                    creep.move(path[0].direction);
                    creep.say('🎯');
                }
                else {
                    creep.memory.state = 'work';
                }
            }
            else {
                const path = creep.pos.findPathTo(target);
                if(path.length > 1) {
                    creep.move(path[0].direction);
                    creep.say('🎯');                    
                }
                else {
                    creep.memory.state = 'work';
                }
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