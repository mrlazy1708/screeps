const roleWorkerBuild = {
    run: function(creep) {
        let sum = creep.memory.reserved - creep.store.getFreeCapacity(RESOURCE_ENERGY);
        if(sum < 0) {
            global.task.collect.Push({time: 3, pri: sum, hostID: creep.id});
        }

        if(creep.memory.state == 'idle') {
            const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target != null) {
                creep.memory.targetID = target.id;
                creep.memory.targetPos = target.pos;
                creep.memory.state = 'arrive';
            }
            else {
                creep.memory.work = 'jack';
                let bodyWork = _.filter(creep.body, function(part) {
                    return part.type == WORK;
                });
                creep.room.memory.vConsume -= bodyWork.length * BUILD_POWER;
                creep.say('🧬', true);
            }
        }

        if(creep.memory.state == 'arrive') {
            const target = Game.getObjectById(creep.memory.targetID);
            if(!creep.pos.inRangeTo(target.pos, 1)) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('🎯', true);
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
                        creep.say('🚧', true);
                    }
                    else {
                        creep.memory.state = 'idle';
                        creep.say('💤', true);
                    }
                }
                else {
                    creep.say('⏹', true);
                }
            }
            else {
                require('task.examine').run(creep.room);
                creep.memory.state = 'idle';
                creep.say('✅︎️', true);
            }
        }
    }
};

module.exports = roleWorkerBuild;