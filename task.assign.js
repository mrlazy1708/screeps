function assignTrans(tasks, creeps, state) {
    for(let task; (task = tasks.Top()) != undefined; ) {
        let host = Game.getObjectById(task.hostID);
        if(host != undefined) {
            let index = host.pos.Find(creeps);
            if(index != null) {
                let creep = creeps[index];
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

        for(let i = global.task.sources.length; i > 1; i--) {
            global.task.spawn.Push({time: 2, pri: 0, disc: {role: 'courier', home: Game.getObjectById(global.task.sources.Top().hostID).pos.roomName}});
        }
    }
};

module.exports = taskAssign;