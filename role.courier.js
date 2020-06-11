const roleCourier = {
    run: function(creep) {
        if(creep.memory.state == 'idle') {
            global.courier.empty.push(creep);
            creep.say('💤', true);
        }

        if(creep.memory.state == 'carry') {
            global.courier.carry.push(creep);
            creep.say('📦', true);
        }

        if(creep.memory.state == 'get') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store[RESOURCE_ENERGY] >= creep.memory.reserved || target.memory.rate < 3.0) {
                        creep.withdraw(target, RESOURCE_ENERGY);
                        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) <= target.store[RESOURCE_ENERGY]) {
                            creep.memory.state = 'carry';
                        }
                        else {
                            creep.memory.state = 'idle';
                        }
                        target.memory.reserved -= creep.memory.reserved;
                        creep.memory.targetID = null;
                        creep.say('✅︎️', true);
                    }
                    else {
                        creep.say('⏳', true);
                    }
                }
                else {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#66ccff'}});
                    creep.say('📥', true);
                }
            }
            else {
                creep.memory.state = 'idle';
                creep.say('💤', true);
            }
        }

        if(creep.memory.state == 'give') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.memory.reserved || target.memory.rate > -3.0) {
                        creep.transfer(target, RESOURCE_ENERGY);
                        if(creep.store[RESOURCE_ENERGY] <= target.store.getFreeCapacity(RESOURCE_ENERGY)) {
                            creep.memory.state = 'idle';
                        }
                        else {
                            creep.memory.state = 'carry';
                        }
                        target.memory.reserved -= creep.memory.reserved;
                        creep.memory.targetID = null;
                        creep.say('✅︎️', true);
                    }
                    else {
                        creep.say('⏳', true);
                    }
                }
                else {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffcc66'}});
                    creep.say('📤', true);
                }
            }
            else {
                creep.memory.state = 'carry';
                creep.say('📦', true);
            }
        }

        if(creep.memory.state == 'idle' || creep.memory.state == 'carry') {
            creep.room.nCourier.free++;
        }
        creep.room.nCourier.sum++;
    }
};

module.exports = roleCourier;