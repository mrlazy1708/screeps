var roleClaimer = {
    run: function(creep) {
        
        var target = Game.getObjectById('5bbcaf9b9099fc012e63ade8');
        console.log(creep.claimController(target));
        if(creep.claimController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
	}
};

module.exports = roleClaimer;