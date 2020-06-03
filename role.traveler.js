const roleTraveler = {
    run: function(creep) {

        if(creep.memory.state == 'idle') {
            const route = Game.map.findRoute(creep.room, creep.memory.roomName);
            creep.memory.targetPos = creep.pos.findClosestByPath(route[0].exit);
            creep.memory.state = 'travel';
        }

        if(creep.memory.state == 'travel') {
            const path = creep.pos.findPathTo(creep.memory.targetPos);
            creep.move(creep.pos.getDirectionTo(path[0]));
            if(path.length == 1) {
                creep.memory.state = 'idle';
            }
            else {
                creep.say('🚌');
            }
        }
    }
};

module.exports = roleTraveler;