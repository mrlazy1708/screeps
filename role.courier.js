const roleCourier = {
    run: function(creep) {
        if(creep.memory.state == 'idle') {
            Memory.empty.push(creep.id);
            creep.say('💤');
        }

        if(creep.memory.state == 'carry') {
            Memory.carry.push(creep.id);
            creep.say('📦');
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

        if(creep.memory.state == 'give') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.memory.reserved) {
                        if(creep.store[RESOURCE_ENERGY] <= creep.memory.reserved) {
                            creep.memory.state = 'idle';
                        }
                        else {
                            creep.memory.state = 'carry';
                        }
                        target.memory.reserved -= creep.memory.reserved;
                        creep.memory.reserved = 0;
                        creep.transfer(target, RESOURCE_ENERGY);
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