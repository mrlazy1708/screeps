var roleCourier = {
    run: function(creep) {
        var target = Game.getObjectById(creep.memory.targetID);
        if(target == null) {
            creep.memory.state = 'idle';
        }
        
        if(creep.memory.state == 'idle') {
            creep.say('💤');
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.state = 'carry';
            }
            else {
                var host = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return (object.memory.role == 'harvester') && (object.store[RESOURCE_ENERGY] - object.memory.reserved > 0);
                    }
                });
                if(host != null) {
                    host.memory.reserved += creep.store.getFreeCapacity();
                    creep.memory.reserved = creep.store.getFreeCapacity();
                    target = host;
                    creep.memory.targetID = host.id;
                    creep.memory.state = 'get';
                    Game.spawns['Spawn1'].memory.assign++;
                    console.log('creep #'+creep.id+' will fetch '+creep.memory.reserved+' energy from creep #'+host.id);
                }
            }
        }
        
        if(creep.memory.state == 'get') {
            if(creep.store.getFreeCapacity() == 0){
                target.memory.reserved -= creep.memory.reserved;
                creep.memory.reserved = 0;
                creep.memory.state = 'carry';
                creep.say('📦');
            }
            else {
                var ERR = target.transfer(creep, RESOURCE_ENERGY);
                target.memory.reserved -= creep.memory.reserved - creep.store.getFreeCapacity();
                creep.memory.reserved = creep.store.getFreeCapacity();
                if(ERR == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#66ccff'}});
                    creep.say('📥');
                }
                else if(ERR == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.state = 'idle';
                }
                else {
                    creep.say('🔄');
                }
            }
        }
        
        if(creep.memory.state == 'carry') {
            creep.say('📦');
            if(creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.state = 'idle';
            }
            else {
                var host;
                if(Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) - Game.spawns['Spawn1'].memory.reserved > 0) {
                    host = Game.spawns['Spawn1'];
                }
                else {
                    host = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                        filter: function(object) {
                            return (object.memory.role == 'upgrader' || object.memory.role == 'stocker' || object.memory.role == 'builder') && object.store.getFreeCapacity() - object.memory.reserved > 0;
                        }
                    });
                }
                if(host != null) {
                    host.memory.reserved += creep.store[RESOURCE_ENERGY];
                    creep.memory.reserved = creep.store[RESOURCE_ENERGY];
                    target = host;
                    creep.memory.targetID = host.id;
                    creep.memory.state = 'give';
                    Game.spawns['Spawn1'].memory.assign++;
                    console.log('creep #'+creep.id+' will deliver '+creep.memory.reserved+' energy to creep #'+host.id);
                }
            }
        }
            
        if(creep.memory.state == 'give') {
            if(creep.store[RESOURCE_ENERGY] == 0 || (target.memory.role == 'spawn' && target.store.getFreeCapacity(RESOURCE_ENERGY) == 0)){
                target.memory.reserved -= creep.memory.reserved;
                creep.memory.reserved = 0;
                creep.memory.state = 'idle';
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
	}
};

module.exports = roleCourier;