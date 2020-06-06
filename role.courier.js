const roleCourier = {
    run: function(creep) {
        if(memory.state == 'idle') {
            creep.room.empty.push(creep);
            creep.say('💤');
        }
        if(creep.memory.state == 'get') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store[RESOURCE_ENERGY] >= creep.memory.reserved) {
                        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) <= creep.memory.reserved) {
                            creep.memory.state = 'carry';
                        }
                        else {
                            creep.memory.state = 'idle';
                        }
                        target.memory.reserved -= creep.memory.reserved;
                        creep.memory.reserved = 0;
                        creep.withdraw(target, RESOURCE_ENERGY);
                    }
                    else {
                        creep.say('⏳');
                    }
                }
                else {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#66ccff'}});
                    creep.say('📥');
                }
            }
            else {
                creep.memory.state = 'idle';
                creep.say('💤');
            }
        }
        if(creep.memory.state == 'carry') {
        	creep.room.carry.push(creep);
            creep.say('📦');
        }
        if(creep.memory.state == 'give') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.memory.reserved || target.memory.role != 'worker') {
                        if(creep.store[RESOURCE_ENERGY] == Math.min(target.store.getFreeCapacity(RESOURCE_ENERGY), creep.memory.reserved)) {
                            creep.memory.state = 'idle';
                        }
                        else {
                            creep.memory.state = 'carry';
                        }
                        creep.transfer(target, RESOURCE_ENERGY);
                        target.memory.reserved -= creep.memory.reserved;
                        creep.memory.reserved = 0;
                        creep.say('✅︎️');
                    }
                    else {
                        creep.say('⏳');
                    }
                }
                else {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffcc66'}});
                    creep.say('📤');
                }
            }
            else {
                creep.memory.state = 'carry';
                creep.say('📦');
            }
        }
    }
};

module.exports = roleCourier;