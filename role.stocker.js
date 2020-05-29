var roleStocker = {
    run: function (creep) {
        
        if(creep.memory.state == 'idle') {
            creep.say('💤');
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity
                }
            });
            if(target != null) {
                creep.memory.targetID = target.id;
                creep.memory.state = 'work';
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store[RESOURCE_ENERGY] != 0) {
                var target = Game.getObjectById(creep.memory.targetID);
                var ERR = creep.transfer(target, RESOURCE_ENERGY);
                if(ERR == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🎯');
                }
                else if(ERR == ERR_FULL){
                    creep.memory.state = 'idle';
                }
                else {
                    creep.say('🔋');
                }
            }
            else {
                creep.say('⏹');
            }
        }
    }
}

module.exports = roleStocker;