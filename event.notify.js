var eventNotify = {
    run: function() {

        var message = 'Game report of room '+Game.spawns['Spawn1'].room.name+'\n';

        message += 'Time: '+Game.time+'\n';

        message += 'CPU usage: '+Game.cpu.getUsed().toFixed(2)+'/'+Game.cpu.limit+'\n';

        var creeps;

        creeps = _.filter(Game.creeps, object => object.memory.role == 'harvester');
        message += 'Creeps: harvester: '+creeps.length+'\n';
        for(var i in creeps) {
            map[creeps[i].pos.y][creeps[i].pos.x]='H';
        }

        creeps = _.filter(Game.creeps, object => object.memory.role == 'upgrader');
        message += '        upgrader: '+creeps.length+'\n';
        for(var i in creeps) {
            map[creeps[i].pos.y][creeps[i].pos.x]='U';
        }

        creeps = _.filter(Game.creeps, object => object.memory.role == 'builder');
        message += '        builder: '+creeps.length+'\n';
        for(var i in creeps) {
            map[creeps[i].pos.y][creeps[i].pos.x]='B';
        }

        creeps = _.filter(Game.creeps, object => object.memory.role == 'courier');
        message += '        courier: '+creeps.length+'\n';
        for(var i in creeps) {
            map[creeps[i].pos.y][creeps[i].pos.x]='C';
        }

        creeps = _.filter(Game.creeps, object => object.memory.role == 'stocker');
        message += '        stocker: '+creeps.length+'\n';
        for(var i in creeps) {
            map[creeps[i].pos.y][creeps[i].pos.x]='S';
        }

        creeps = _.filter(Game.creeps, object => object.memory.role == 'tramp');
        message += '        tramp: '+creeps.length+'\n';
        for(var i in creeps) {
            map[creeps[i].pos.y][creeps[i].pos.x]='T';
        }

        message += 'Death during last period: '+Game.spawns['Spawn1'].memory.death+'\n';
        
        message += 'Assignments during last period: '+Game.spawns['Spawn1'].memory.assign+'\n';
        
        message += 'Room controller: level: '+Game.spawns['Spawn1'].room.controller.level+', progress: '+Game.spawns['Spawn1'].room.controller.progress+'/'+Game.spawns['Spawn1'].room.controller.progressTotal+'\n';
        
        Game.spawns['Spawn1'].memory.death = 0;
        Game.spawns['Spawn1'].memory.assign = 0;

        console.log(message);
        Game.notify(message);
	}
};

module.exports = eventNotify;