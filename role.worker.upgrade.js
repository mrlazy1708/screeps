const rolwWorkerUpgrade = {
    run: function(creep) {
        let sum = creep.memory.reserved - creep.store.getFreeCapacity(RESOURCE_ENERGY);
        if(sum < 0) {
            global.task.collect.Push({time: 3, pri: sum, hostID: creep.id});
        }

        if(creep.memory.state == 'idle') {
            if(creep.room.controller != undefined && creep.room.controller.my) {
                creep.memory.state = 'arrive';
            }
            else {
                creep.memory.work = 'jack';
                let bodyWork = _.filter(creep.body, function(part) {
                    return part.type == WORK;
                });
                creep.room.memory.vConsume -= bodyWork.length * UPGRADE_CONTROLLER_POWER;
                creep.say('🧬', true);
            }
        }

        if(creep.memory.state == 'arrive') {
            const target = creep.room.controller;
            if(!creep.pos.inRangeTo(target.pos, 3)) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('🎯', true);
            }
            else {
                creep.memory.state = 'work';
            }
        }

        if(creep.memory.state == 'work') {
            if(creep.store[RESOURCE_ENERGY] != 0) {
                if(creep.upgradeController(creep.room.controller) == OK) {
                    creep.say('🆙️️', true);
                }
                else {
                    creep.memory.state = 'idle';
                }
            }
            else {
                creep.say('⏹', true);
            }
        }
    }
};

module.exports = roleWorkerUpgrade;