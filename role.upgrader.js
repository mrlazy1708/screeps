var roleUpgrader = {
    run: function(creep) {
        
        if(creep.memory.state == 'idle') {
            creep.say('💤');
            const _path = creep.pos.findPathTo(Game.flags['Flag_upgrade'].pos);
            if(_path.length < 2) {
                creep.memory.state = 'work';
            }
            else {
                creep.move(_path[0].direction);
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store[RESOURCE_ENERGY] != 0) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🎯');
                }
                else {
                    creep.say('🆙️️');
                }
            }
            else {
                creep.say('⏹');
            }
        }
	}
};

module.exports = roleUpgrader;