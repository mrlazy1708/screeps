var roleCourier = require('role.courier');

var roleTramp = {
    run: function(creep) {
        
        if(creep.memory.state == 'idle') {
            if(creep.store.getFreeCapacity() < creep.store.getCapacity()/2) {
                var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🔥');
                    }
                    else {
                        creep.say('💰');
                    }
                }
                else {
                    creep.say('💤');
                }
            }
            else {
                creep.memory.state = 'carry';
            }
        }
        
        if(creep.memory.state != 'idle') {
            roleCourier.run(creep);
        }
	}
};

module.exports = roleTramp;