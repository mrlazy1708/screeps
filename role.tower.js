var roleTower = {
    run: function(tower) {

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
};

module.exports = roleTower;