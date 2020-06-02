var roleClaimer = {
    run: function(creep) {

        if(creep.room.name != 'E44S32') {
            creep.moveTo(new RoomPosition(36, 14, 'E44S32'));
        }
        else {
            if(creep.memory.state == 'h') {
                if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                    creep.memory.state = 'u';
                }
                else {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }

            if(creep.memory.state == 'u') {
                if(creep.store[RESOURCE_ENERGY] == 0) {
                    creep.memory.state = 'h';
                }
                else {
                    var target = Game.getObjectById('5bbcaf9b9099fc012e63ade8');
                    if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;
