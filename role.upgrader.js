const roleUpgrader = {
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
            const path = PathFinder.search(creep.pos, creep.room.controller.pos).path;
            if(path.length > 3) {
                creep.move(creep.pos.getDirectionTo(path[0]));
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

module.exports = roleUpgrader;