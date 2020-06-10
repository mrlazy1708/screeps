function assignTrans(tasks, creeps, val) {
    for(let index in creeps)
        if(Game.getObjectById(creeps[index]) == null)
            creeps.Delete(index);

    for(let task; (task = tasks.Top()) != undefined && task.time <= Game.time; ) {
        let host = Game.getObjectById(task.hostID);
        if(host != undefined) {
            let index = host.pos.Find(creeps);
            if(index != null) {
                let creep = Game.getObjectById(creeps[index]);
                mDelete(creeps, index);
                tasks.Pop();
                if(val(creep) < -task.pri) {
                    creep.memory.reserved = val(creep);
                    tasks.Push({time: task.time, pri: task.pri + creep.memory.reserved, hostID: host.id});
                }
                else {
                    creep.memory.reserved = -task.pri;
                    host.memory.wait = false;
                }
                host.memory.reserved += creep.memory.reserved;
                creep.memory.targetID = host.id;
                creep.memory.state = 'get';
            }
            else return;
        }
    }
}

const taskAssign = {
    run: function() {
        assignTrans(Memory.task.sources, Memory.empty, (creep)=>{return creep.store.getFreeCapacity(RESOURCE_ENERGY);});
        assignTrans(Memory.task.collect, Memory.carry, (creep)=>{return creep.store[RESOURCE_ENERGY];});
    }
};

module.exports = taskAssign;