var roleClaimer = {
    run: function(creep) {
        
        var target = Game.getObjectById('5bbcaf9b9099fc012e63ade8');
        console.log(target);
        if(creep.attackController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
	}
};

module.exports = roleClaimer;