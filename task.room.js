const taskRoom = {
    run: function() {
        for(let name in Game.rooms) {
            let room = Game.rooms[name], enemys = room.find(FIND_HOSTILE_CREEPS);
            if(enemys.length) {
                if(!room.memory.invaded) {
                    room.memory.invaded = true;
                    Memory.message += Game.time+': '+enemys.length+enemys[0].owner.username+'\'s creep'+(enemys.length==1?'':'s')+' in '+room.name+'\n';
                    console.log('Room '+room.name+' is under attack!');
                }
                /*
                enemys.forEach(function(object) {
                    let victims = object.pos.findInRange(FIND_MY_CREEPS, 5, {
                        filter: function(object) {
                            return object.memory.painc != Game.time;
                        }
                    });
                    victims.forEach(function(creep) {
                        const path = PathFinder.search(creep.pos, enemys.map(object=>{return{pos: object.pos, range: 5}}), {flee: true}).path;
                        creep.move(path[0].direction);
                        creep.memory.panic = Game.time;
                        creep.say('🐥', true);
                    });
                });*/
            }
            else {
                if(room.memory.invaded) {
                    room.memory.invaded = false;
                    taskExamine.run(room);
                    console.log('Enemys slayed in room '+room.name+' !');
                }
            }

            if(room.memory.nHarvester < room.memory.containers.length) {
                global.task.spawn.Push({time: 1, pri: room.memory.nHarvester - room.memory.containers.length, disc: {role: 'harvester', home: room.name}});
            }

            if(room.memory.vConsume < room.memory.vExpect) {
                global.task.spawn.Push({time: 3, pri: room.memory.vContume - room.memory.vExpect, disc: {role: 'worker', home: room.name}});
            }

            if(room.memory.init == undefined) {
                room.memory.init = true;
                global.task.spawn.Push({time: -1, pri: -1, disc: {role: 'worker', home: room.name}});
            }
        }
    }
};

module.exports = taskRoom;