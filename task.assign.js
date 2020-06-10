function assignTrans(tasks, creeps, state) {
    for(let index = 0; index < creeps.length; index++) {
        if(Game.getObjectById(creeps[index]) == null) {
            creeps.Delete(index);
        }
    }

    for(let task; (task = tasks.Top()) != undefined; ) {
        let host = Game.getObjectById(task.hostID);
        if(host != undefined) {
            let index = host.pos.Find(creeps);
            if(index != null) {
                let creep = Game.getObjectById(creeps[index]);
                creeps.Delete(index);
                tasks.Pop();
                creep.memory.reserved = state == 'get'?creep.store.getFreeCapacity(RESOURCE_ENERGY):creep.store[RESOURCE_ENERGY];
                tasks.Push({time: task.time, pri: task.pri + creep.memory.reserved, hostID: host.id});
                host.memory.reserved += creep.memory.reserved;
                creep.memory.targetID = host.id;
                creep.memory.state = state;
                console.log('#'+creep.id+' will '+(state=='get'?'fetch ':'deliver ')+creep.memory.reserved+' energy '+(state=='get'?'from #':'to #')+host.id);
            }
            else return;
        }
    }
}

const taskAssign = {
    run: function() {
        assignTrans(global.task.sources, global.courier.empty, 'get');
        assignTrans(global.task.collect, global.courier.carry, 'give');
    }
};

module.exports = taskAssign;