var taskDefense = {
    run: function(enemys) {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            let path = PathFinder.search(creep.pos, enemys.map(c=>{ return{ pos: c.pos, range: 5 } }, { flee: true })).path;
            console.log(path);
            if(path.length > 0) {
                creep.moveByPath(path);
            }
        }
	}
};

module.exports = taskDefense;