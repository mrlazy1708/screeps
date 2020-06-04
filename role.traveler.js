const roleTraveler = {
    run: function(creep) {

        if(creep.memory.state == 'idle') {
            const target = creep.pos.findClosestByPath(Game.map.findRoute(creep.room, creep.memory.roomName)[0].exit);
            creep.memory.x = target.x;
            creep.memory.y = target.y;
            creep.memory.state = 'travel';
        }

        if(creep.memory.state == 'travel') {
            if(creep.memory.curRoom == creep.room.name) {
                creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.room.name));
                creep.say('🚌');
            }
            else {
                creep.memory.state = 'idle';
                creep.memory.curRoom = creep.room.name;
                if(creep.memory.curRoom == creep.memory.roomName) {
                    if(creep.pos.x == 0) {
                        creep.move(RIGHT);
                    }
                    if(creep.pos.x == 49) {
                        creep.move(LEFT);
                    }
                    if(creep.pos.y == 0) {
                        creep.move(TOP);
                    }
                    if(creep.pos.y == 49) {
                        creep.move(BOTTOM);
                    }
                    creep.say('🗽');
                }
                else {
                    creep.say('💤');
                }
            }
        }
    }
};

module.exports = roleTraveler;