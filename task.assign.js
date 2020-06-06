const pq = require('priority_queue');

const taskAssign = {
    run: function() {
        for(let task; (task = pq.top(global.sources)) != undefined; ) {
            let host = Game.getObjectById(task.hostID), creep = host.pos.findClosestByPath(host.room.empty);
            pq.remove(global.sources);
            if(creep != null) {
                creep.memory.reserved = Math.min(creep.store.getFreeCaapcity(RESOURCE_ENERGY), -task.pri);
                creep.memory.targetID = host.id;
                creep.memory.state = 'get';
                target.memory.reserved += creep.memory.reserved;
                delete host.room.empty[creep.name];
                if(task.pri + creep.memory.reserved < 100) {
                    pq.insert(global.sources, {time: task.time, pri: task.pri + creep.memory.reserved, hostID: host.id});
                }
            }
            else {
                break;
            }
        }
        for(let task; (task = pq.top(global.collect)) != undefined; ) {
            let host = Game.getObjectById(task.hostID), creep = host.pos.findClosestByPath(host.room.carry);
            pq.remove(global.collect);
            if(creep != null) {
                creep.memory.reserved = Math.min(creep.store[RESOURCE_ENERGY], -task.pri);
                creep.memory.targetID = host.id;
                creep.memory.state = 'give';
                target.memory.reserved += creep.memory.reserved;
                delete host.room.carry[creep.name];
                if(task.pri + creep.memory.reserved < 0) {
                    pq.insert(global.collect, {time: task.time, pri: task.pri + creep.memory.reserved, hostID: host.id});
                }
            }
            else {
                break;
            }
        }
    }
};

module.exports = taskAssign;