const roleCourier = {
    run: function(creep) {

        if(creep.memory.state == 'idle') {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_CONTAINER && object.memory.reserved - object.store[RESOURCE_ENERGY] < creep.pos.getRangeTo(object.pos)*10;
                }
            });
            if(target != null) {
                target.memory.reserved += creep.store.getFreeCapacity();
                creep.memory.reserved = creep.store.getFreeCapacity();
                creep.memory.targetID = target.id;
                creep.memory.state = 'get';
                Memory.nTask++;
                console.log('#'+creep.id+' will fetch '+creep.memory.reserved+' energy from #'+target.id);
            }
            else {
                creep.say('💤');
            }
        }
        
        if(creep.memory.state == 'get') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store[RESOURCE_ENERGY] >= creep.memory.reserved) {
                        creep.withdraw(target, RESOURCE_ENERGY);
                        target.memory.reserved -= creep.memory.reserved;
                        creep.memory.reserved = 0;
                        creep.memory.state = 'flee->carry';
                    }
                    else {
                        creep.say('⏳');
                    }
                }
                else {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#66ccff'}});
                    creep.say('📥');
                }
            }
            else {
                creep.memory.state = 'idle';
                creep.say('💤');
            }
        }

        if(creep.memory.state == 'flee->carry') {
            // const path = PathFinder.search(creep.pos, {pos: target.pos, range: 3 }, { flee: true }).path;
            // if(path.length > 0 && 0) {
            //     creep.moveByPath(path);
            //     creep.say('⏏️');
            // }
            // else {
                creep.memory.state = 'carry';
            // }
        }
        
        if(creep.memory.state == 'carry') {
            let target = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
                filter: (object) => { 
                    return object.memory.reserved - object.store.getFreeCapacity(RESOURCE_ENERGY) < 0;
                }
            });
            if(target == null) {
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (object) => { 
                        return object.structureType == STRUCTURE_EXTENSION && object.memory.reserved - object.store.getFreeCapacity(RESOURCE_ENERGY) < 0;
                    }
                });
                if(target == null) {
                    target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_TOWER && object.memory.state == 'fill' && object.memory.reserved - object.store.getFreeCapacity(RESOURCE_ENERGY) < 0;
                        }
                    });
                    if(target == null) {
                        target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                            filter: function(object) {
                                return object.memory.role == 'worker' && object.memory.reserved - object.store.getFreeCapacity(RESOURCE_ENERGY) < creep.pos.getRangeTo(object.pos)*4;
                            }
                        });
                        if(target == null) {
                            target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                filter: function(object) {
                                    return object.structureType == STRUCTURE_TOWER && object.memory.reserved - object.store.getFreeCapacity(RESOURCE_ENERGY) < 0;
                                }
                            });
                        }
                    }
                }
            }
            if(target != null) {
                target.memory.reserved += creep.store[RESOURCE_ENERGY];
                creep.memory.reserved = creep.store[RESOURCE_ENERGY];
                creep.memory.targetID = target.id;
                creep.memory.state = 'give';
                Memory.nTask++;
                console.log('#'+creep.id+' will deliver '+creep.memory.reserved+' energy to #'+target.id);
            }
            else {
                creep.say('📦');
            }
        }

        if(creep.memory.state == 'give') {
            let target = Game.getObjectById(creep.memory.targetID);
            if(target != null) {
                if(creep.pos.inRangeTo(target.pos, 1)) {
                    if(target.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.memory.reserved || target.store[RESOURCE_ENERGY] == 0 || target.memory.role != 'worker') {
                        creep.transfer(target, RESOURCE_ENERGY);
                        const nRem = Math.max(creep.memory.store[RESOURCE_ENERGY] - target.store.getFreeCapacity(RESOURCE_ENERGY), 0);
                        target.memory.reserved -= creep.memory.reserved - nRem;
                        creep.memory.reserved = nRem;
                        if(nRem == 0) {
                            creep.memory.state = 'flee->idle';
                        }
                        else if(target.memory.role != 'worker'){
                            creep.memory.state = 'flee->carry';
                        }
                    }
                    else {
                        creep.say('⏳');
                    }
                }
                else {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffcc66'}});
                    creep.say('📥');
                }
            }
            else {
                creep.memory.state = 'carry';
                creep.say('📦');                
            }
        }

        if(creep.memory.state == 'flee->idle') {
            // let path = PathFinder.search(creep.pos, {pos: target.pos, range: 3 }, { flee: true }).path;
            // if(path.length > 0 && 0) {
            //     creep.moveByPath(path);
            //     creep.say('⏏️');
            // }
            // else {
                creep.memory.state = 'idle';
                creep.say('✅︎️');
            // }
        }

    }
};

module.exports = roleCourier;