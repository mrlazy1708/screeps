var roleTower = {
    run: function(tower) {
        if(tower.store[RESOURCE_ENERGY] >= 10) {
            var target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(object) {
                    return object.hitsMax - object.hits >= 200;
                }
            });
            if(target) {
                tower.repair(target);
            }
        }
	}
};

module.exports = roleTower;