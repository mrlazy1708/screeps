var taskDefense = {
    run: function(enemys) {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            var path = PathFinder.search(creep.pos, enemys.map(c=>{ return{ pos: c.pos, range: 3 } }), { flee: true }).path;
            if(path.length > 0) {
                creep.moveByPath(path);
            }
        }
	}
};

module.exports = taskDefense;