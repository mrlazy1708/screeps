const pq = require('priority_queue');

const taskAssign = {
    run: function() {
        for(let task; (task = pq.top(global.sources)) != undefined; ) {
            let host = Game.getObjectById(task.hostID), empty = host.room.empty, creep = host.pos.findClosestByPath(empty);
            pq.remove(global.sources);
            if(creep != null) {
                creep.memory.reserved = Math.min(creep.store.getCapacity(RESOURCE_ENERGY) - creep.store[RESOURCE_ENERGY], -task.pri);
                creep.memory.targetID = host.id;
                creep.memory.state = 'get';
                host.memory.reserved += creep.memory.reserved;
                empty[empty.indexOf(creep)] = empty[empty.length - 1];
                empty.pop();
                if(task.pri + creep.memory.reserved < -100) {
                    pq.insert(global.sources, {time: task.time, pri: task.pri + creep.memory.reserved, hostID: host.id});
                }
            }
            else {
                break;
            }
        }
        for(let task; (task = pq.top(global.collect)) != undefined; ) {
            let host = Game.getObjectById(task.hostID), carry = host.room.carry, creep = host.pos.findClosestByPath(carry);
            pq.remove(global.collect);
            if(creep != null) {
                creep.memory.reserved = Math.min(creep.store[RESOURCE_ENERGY], -task.pri);
                creep.memory.targetID = host.id;
                creep.memory.state = 'give';
                host.memory.reserved += creep.memory.reserved;
                carry[carry.indexOf(creep)] = carry[carry.length - 1];
                carry.pop();
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