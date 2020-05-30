var roleTower = {
    run: function(tower) {
        if(tower.store[RESOURCE_ENERGY] >= 10) {
            var target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_ROAD;
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