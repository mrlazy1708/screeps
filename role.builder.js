const taskExamine = require('task.examine');

const roleBuilder = {
    run: function(creep) {

        if(creep.memory.state == 'idle') {
            const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target != null) {
                creep.memory.targetID = target.id;
                creep.memory.targetPos = target.pos;
                creep.memory.state = 'arrive';
            }
            else {
                creep.say('💤');
            }
        }

        if(creep.memory.state == 'arrive') {
            const target = Game.getObjectById(creep.memory.targetID);
            if(!creep.pos.inRangeTo(target.pos, 1)) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('🎯');
            }
            else {
                creep.memory.state = 'work';
            }
        }

        if(creep.memory.state == 'work') {
            const target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.store[RESOURCE_ENERGY] != 0) {
                    if(creep.build(target) == OK) {
                        creep.say('🚧');
                    }
                    else {
                        creep.memory.state = 'idle';
                        creep.say('💤');
                    }
                }
                else {
                    creep.say('⏹');
                }
            }
            else {
                taskExamine.run(creep.room);
                creep.memory.state = 'idle';
                creep.say('✅︎️');
            }
        }
    }
};

module.exports = roleBuilder;