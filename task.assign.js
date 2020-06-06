const taskAssign = {
    run: function() {
        for(let task; (task = global.sources.top()) != undefined; ) {
            let host = Game.getObjectById(task.hostID), creep = host.pos.findClosestByPath(host.room.empty);
            global.sources.remove();
            if(creep != null) {
                creep.memory.reserved = Math.min(creep.store.getFreeCaapcity(RESOURCE_ENERGY), -task.pri);
                creep.memory.targetID = host.id;
                creep.memory.state = 'get';
                target.memory.reserved += creep.memory.reserved;
                delete host.room.empty[creep.name];
                if(task.pri + creep.memory.reserved < 100) {
                    global.sources.insert({.time: task.time, .pri: task.pri + creep.memory.reserved, .hostID: host.id});
                }
            }
            else {
                break;
            }
        }
        for(let task; (task = global.collect.top()) != undefined; ) {
            let host = Game.getObjectById(task.hostID), creep = host.pos.findClosestByPath(host.room.carry);
            global.collect.remove();
            if(creep != null) {
                creep.memory.reserved = Math.min(creep.store[RESOURCE_ENERGY], -task.pri);
                creep.memory.targetID = host.id;
                creep.memory.state = 'give';
                target.memory.reserved += creep.memory.reserved;
                delete host.room.carry[creep.name];
                if(task.pri + creep.memory.reserved < 0) {
                    global.collect.insert({.time: task.time, .pri: task.pri + creep.memory.reserved, .hostID: host.id});
                }
            }
            else {
                break;
            }
        }
    }
};

module.exports = taskAssign;