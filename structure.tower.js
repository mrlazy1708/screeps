const structureTower = {
    run: function(tower) {
        let sum = tower.memory.reserved - tower.store.getFreeCapacity(RESOURCE_ENERGY);
        if(sum < 0) {
            global.task.collect.Push({time: 2, pri: sum, hostID: tower.id});
        }

        if(tower.store[RESOURCE_ENERGY] >= 10) {
            const enemys = tower.room.find(FIND_HOSTILE_CREEPS);
            if(enemys.length) {
                tower.attack(enemys[0]);
            }
            else {
                const injured = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return object.hitsMax - object.hits > 0;
                    }
                });
                if(injured) {
                    tower.heal(injured);
                }
                else {
                    const damaged = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function(object) {
                            return object.hitsMax - object.hits >= 10 && object.structureType != STRUCTURE_WALL;
                        }
                    });
                    if(damaged) {
                        tower.repair(damaged);
                    }
                }
            }
        }
    }
};

module.exports = structureTower;