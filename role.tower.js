var roleTower = {
    run: function(tower) {
tower.memory.reserved = 0;
        if(tower.memory.state == 'fill') {
            if(tower.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                tower.memory.state = 'full';
            }
        }
        else if(tower.memory.state == 'full') {
            if(tower.store.getFreeCapacity(RESOURCE_ENERGY) * 2 >= tower.store.getCapacity(RESOURCE_ENERGY)) {
                tower.memory.state = 'fill';
            }
        }
        else {
            tower.memory.state = 'fill';
        }

        if(tower.store[RESOURCE_ENERGY] >= 10) {
            var enemys = tower.room.find(FIND_HOSTILE_CREEPS);
            if(enemys.length) {
                tower.attack(enemys[0]);
            }
            else {
                var injured = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return object.hitsMax - object.hits > 0;
                    }
                });
                if(injured) {
                    tower.heal(injured);
                }
                else {
                    var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object) {
                            return object.hitsMax - object.hits >= 10 && object.structureType != STRUCTURE_WALL;
                        }
                    });
                    if(target) {
                        tower.repair(target);
                    }
                }
            }
        }
	}
};

module.exports = roleTower;