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
            const path = PathFinder.search(creep.pos, target.pos).path;
            if(path.length > 0) {
                creep.move(creep.pos.getDirectionTo(path[0]));
                creep.say('🎯');
            }
            else {
                creep.move(PathFinder.search(creep.pos, { pos: target.pos, range: 1 }, { flee: true }).path[0].direction);
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