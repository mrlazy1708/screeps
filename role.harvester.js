const roleHarvester = {
    run: function(creep) {
        if(creep.memory.state == 'idle') {
            let freeContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_CONTAINER && Game.getObjectById(object.memory.hostID) == null;
                }
            });
            if(freeContainer != null) {
                let source = freeContainer.pos.findClosestByRange(FIND_SOURCES);
                freeContainer.memory.hostID = creep.id;
                creep.memory.targetID = freeContainer.id;
                creep.memory.sourceID = source.id;
                creep.memory.state = 'arrive';
            }
            else {
                creep.say('💤', true);
            }
        }

        if(creep.memory.state == 'arrive') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(!creep.pos.inRangeTo(target.pos, 0)) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🎯', true);
                }
                else {
                    // Memory.task.spawn.Push({time: Game.time + 2 * creep.ticksToLive - 1500, pri: 2, disc: {role: 'harvester', home: creep.room.name}});
                    creep.memory.report = true;
                    creep.memory.state = 'work';
                }
            }
            else {
                creep.memory.state = 'idle';
                creep.say('💤', true);
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.harvest(Game.getObjectById(creep.memory.sourceID)) != ERR_NOT_IN_RANGE) {
                creep.say('🚨️️', true);
            }
            else {
                creep.memory.state = 'arrive';
                creep.say('🎯', true);
            }
        }
    }
};

module.exports = roleHarvester;