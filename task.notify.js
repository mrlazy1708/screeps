var taskNotify = {
    run: function() {

        var message = 'Game report at time '+Game.time+':\n';

        message += 'CPU\t: ['+Memory.CPU_min.toFixed(2)+', '+(Memory.CPU_sum/300.0).toFixed(2)+', '+Memory.CPU_max.toFixed(2)+']\n';

        var creeps;

        creeps = _.filter(Game.creeps, object => object.memory.role == 'harvester');
        message += 'Creeps\t: Harvester\t: '+creeps.length+'\n';

        creeps = _.filter(Game.creeps, object => object.memory.role == 'worker');
        message += '      \t  Worker\t: '+creeps.length+'\n';

        creeps = _.filter(Game.creeps, object => object.memory.role == 'courier');
        message += '      \t  Courier\t: '+creeps.length+'\n';

        message += 'Death\t: '+Memory.nDeath+'\n';
        
        message += 'Task\t: '+Memory.nTask+'\n';
        
        var fLine = true;
        for(var name in Game.rooms) {
            var rc = Game.rooms[name].controller;
            message += (fLine?'Rooms\t: ':'     \t: ')+name+'\t: '+rc.level+(rc.level < 8?' + '+rc.progress+'/'+rc.progressTotal:' , '+rc.hits+'/'+rc.hitsMax)+'\n';
            fLine = false;
        }

        message += Memory.message;

        Memory.CPU_min = 20.0;
        Memory.CPU_sum = 0.0;
        Memory.CPU_max = 0.0;
        Memory.nDeath = 0;
        Memory.nTask = 0;
        Memory.message = '';

        console.log(message);
        Game.notify(message);
	}
};

module.exports = taskNotify;