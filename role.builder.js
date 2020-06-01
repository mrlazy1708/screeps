var roleBuilder = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);        
        if(creep.memory.state == 'idle') {
            target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target != null) {
                creep.memory.targetID = target.id;
                creep.memory.state = 'arrive';
            }
            else {
                creep.say('💤');
            }
        }

        if(creep.memory.state == 'arrive') {
            let path = PathFinder.search(creep.pos, target.pos).path;
            if(path.length > 0) {
                creep.move(path[0].direction);
                creep.say('🎯');
            }
            else {
                creep.move(PathFinder.search(creep.pos, { pos: target.pos, range: 1 }, { flee: true }).path[0].direction);
                creep.memory.state = 'work';
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store[RESOURCE_ENERGY] != 0) {
                if(target != null) {
                    creep.build(target);
                    creep.say('🚧');
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

module.exports = roleBuilder;