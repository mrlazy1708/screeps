const roleTraveler = {
    run: function(creep) {

        if(creep.memory.state == 'idle') {
            const route = Game.map.findRoute(creep.room, creep.memory.roomName);
            creep.memory.targetPos = creep.pos.findClosestByPath(route[0].exit);
            creep.memory.curRoom = creep.room.name;
            creep.memory.state = 'travel';
        }

        if(creep.memory.state == 'travel') {
            if(creep.memory.curRoom == creep.room.name) {
                creep.moveTo(creep.memory.targetPos);
                creep.say('🚌');
            }
            else {
                creep.memory.state = 'idle';
                creep.say('💤');
            }
        }
    }
};

module.exports = roleTraveler;