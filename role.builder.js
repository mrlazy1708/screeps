var roleBuilder = {
    run: function(creep) {
        
        if(creep.memory.state == 'idle') {
            creep.say('💤');
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target != null) {
                creep.memory.targetID = target.id;
                creep.memory.state = 'work';
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store[RESOURCE_ENERGY] != 0) {
                var target = Game.getObjectById(creep.memory.targetID);
                if(target != null) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🎯');
                    }
                    else {
                        creep.say('🚧');
                    }
                }
                else {
                    creep.memory.state = 'idle';
                }
            }
            else {
                creep.say('⏹');
            }
        }
	}
};

module.exports = roleBuilder;