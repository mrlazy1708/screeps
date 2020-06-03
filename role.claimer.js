const roleClaimer = {
    run: function(creep) {

        if(creep.memory.state == 'get') {
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.state = 'give';
            }
            else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }

        if(creep.memory.state == 'give') {
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.state = 'get';
            }
            else {
                let target = Game.getObjectById('5bbcaf9b9099fc012e63ade8');
                if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleClaimer;
