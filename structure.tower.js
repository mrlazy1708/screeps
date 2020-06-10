const structureTower = {
    run: function(tower) {
        if(!tower.memory.wait) {
            let sum = tower.memory.reserved - tower.store.getFreeCapacity(RESOURCE_ENERGY);
            if(sum < 0) {
                tower.memory.wait = true;
                Memory.task.collect.Push({time: Game.time*2 - tower.memory.time, pri: sum, hostID: tower.id});
                tower.memory.time = Game.time;
            }
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