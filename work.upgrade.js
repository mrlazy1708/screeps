const workUpgrade = {
    run: function(creep) {
        if(creep.memory.state == 'idle') {
            if(creep.room.controller != undefined && creep.room.controller.my) {
                creep.memory.state = 'arrive';
            }
            else {
                creep.say('💤');
            }
        }
        if(creep.memory.state == 'arrive') {
            const target = creep.room.controller;
            if(!creep.pos.inRangeTo(target.pos, 3)) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('🎯');
            }
            else {
                creep.memory.state = 'work';
            }
        }
        if(creep.memory.state == 'work') {
            if(creep.store[RESOURCE_ENERGY] != 0) {
                if(creep.upgradeController(creep.room.controller) == OK) {
                    creep.say('🆙️️');
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

module.exports = workUpgrade;