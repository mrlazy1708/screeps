var roleTower = {
    run: function(tower) {
        if(tower.store[RESOURCE_ENERGY] >= 10) {
            var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.hitsMax - object.hits >= 10 && object.structureType != STRUCTURE_WALL;
                }
            });
            console.log(target);
            if(target) {
                tower.repair(target);
            }
        }
	}
};

module.exports = roleTower;