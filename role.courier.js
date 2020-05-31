var roleCourier = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);
        if(target == null) {
            creep.memory.state = 'idle';
        }

        if(creep.memory.state == 'idle') {
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.state = 'carry';
            }
            else {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] - object.memory.reserved > 0;
                    }
                });
                if(target == null) {
                    creep.say('💤');
                }
                else {
                    target.memory.reserved += creep.store.getFreeCapacity();
                    creep.memory.reserved = creep.store.getFreeCapacity();
                    creep.memory.targetID = target.id;
                    creep.memory.state = 'get';
                    Game.spawns['Spawn1'].memory.assign++;
                    console.log('#'+creep.id+' will fetch '+creep.memory.reserved+' energy from #'+target.id);
                }
            }
        }
        
        if(creep.memory.state == 'get') {
            if(target == null) {
                creep.memory.state = 'idle';
                creep.say('💤');
            }
            else {
                if(creep.store.getFreeCapacity() == 0){
                    target.memory.reserved -= creep.memory.reserved;
                    creep.memory.reserved = 0;
                    creep.memory.state = 'flee->carry';
                }
                else {
                    var ERR = creep.withdraw(target, RESOURCE_ENERGY);
                    target.memory.reserved -= creep.memory.reserved - creep.store.getFreeCapacity();
                    creep.memory.reserved = creep.store.getFreeCapacity();
                    if(ERR == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#66ccff'}});
                        creep.say('📥');
                    }
                    else if(ERR == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.state = 'idle';
                        creep.say('💤');
                    }
                    else {
                        creep.say('🔄');
                    }
                }
            }
        }

        if(creep.memory.state == 'flee->carry') {
            let path = PathFinder.search(creep.pos, {pos: target.pos, range: 3 }, { flee: true }).path;
            if(path.length > 0 && 0) {
                creep.moveByPath(path);
                creep.say('⏏️');
            }
            else {
                creep.memory.state = 'carry';
            }
        }
        
        if(creep.memory.state == 'carry') {
            creep.say('📦');
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.state = 'idle';
            }
            else {
                if(Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) - Game.spawns['Spawn1'].memory.reserved > 0) {
                    target = Game.spawns['Spawn1'];
                }
                else {
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (object) => { 
                            return object.structureType == STRUCTURE_EXTENSION && object.energy + object.memory.reserved < object.energyCapacity;
                        }
                    });
                    if(target == null) {
                        target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: function(object) {
                                return object.structureType == STRUCTURE_TOWER && object.memory.state == 'fill' && object.store.getFreeCapacity(RESOURCE_ENERGY) - object.memory.reserved > 0;
                            }
                        });
                        if(target == null) {
                            target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                                filter: function(object) {
                                    return object.memory.role == 'worker' && object.store[RESOURCE_ENERGY] + object.memory.reserved < ( Math.abs(object.pos.x - creep.pos.x) + Math.abs(object.pos.y - creep.pos.y) )*4;
                                }
                            });
                            if(target == null) {
                                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                    filter: function(object) {
                                        return object.structureType == STRUCTURE_TOWER && object.store.getFreeCapacity(RESOURCE_ENERGY) - object.memory.reserved > 0;
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
                    Game.spawns['Spawn1'].memory.assign++;
                    console.log('#'+creep.id+' will deliver '+creep.memory.reserved+' energy to #'+target.id);
                }
            }
        }
            
        if(creep.memory.state == 'give') {
            if(creep.store[RESOURCE_ENERGY] == 0){
                target.memory.reserved -= creep.memory.reserved;
                creep.memory.reserved = 0;
                creep.memory.state = 'flee->idle';
                creep.say('✅︎️');
            }
            else if(target.memory.role != 'worker' && target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                target.memory.reserved -= creep.memory.reserved;
                creep.memory.reserved = 0;
                creep.memory.state = 'flee->carry';
                creep.say('✅︎️');
            }
            else {
                var ERR = creep.transfer(target, RESOURCE_ENERGY);
                target.memory.reserved -= creep.memory.reserved - creep.store[RESOURCE_ENERGY];
                creep.memory.reserved = creep.store[RESOURCE_ENERGY];
                if(ERR == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffcc66'}});
                    creep.say('📤');
                }
                else {
                    creep.say('🔄');
                }
            }
        }

        if(creep.memory.state == 'flee->idle') {
            let path = PathFinder.search(creep.pos, {pos: target.pos, range: 3 }, { flee: true }).path;
            if(path.length > 0 && 0) {
                creep.moveByPath(path);
                creep.say('⏏️');
            }
            else {
                creep.memory.state = 'idle';
            }
        }

	}
};

module.exports = roleCourier;