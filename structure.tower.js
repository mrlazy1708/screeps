const pq = require('priority_queue');

const structureTower = {
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

        if(tower.memory.state == 'fill') {
            let sum = tower.memory.reserved - tower.store.getFreeCapacoty(RESOURCE_ENERGY);
            pq.insert(global.collect, {time: 2, pri: sum, hostID: tower.id});
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