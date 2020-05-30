var roleHarvester = {
    run: function(creep) {
        
var xxx = Game.getObjectById('5ed1ffc870e2816d99eddb74');
creep.pickup(xxx);
creep.drop(RESOURCE_ENERGY);

        if(creep.memory.state == 'idle') {
            creep.say('💤');
            var sources = creep.room.find(FIND_SOURCES);
            for(var index in sources) {
                var source = sources[index], peers = _.filter(Game.creeps, object => object.memory.targetID == source.id);
                if(peers.length < 1) {
                    creep.memory.targetID = source.id;
                    creep.memory.state = 'work';
                    break;
                }
            }
        }
        
        if(creep.memory.state == 'work') {
            if(creep.store.getFreeCapacity() > 0) {
                var target = Game.getObjectById(creep.memory.targetID);
                if(!target) {
                    creep.memory.state = 'idle';
                }
                else {
                    if( creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🎯');
                    }
                    else {
                        creep.say('🚨️️');
                    }
                }
            }
            else {
                creep.say('🍺');
                creep.drop(RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleHarvester;