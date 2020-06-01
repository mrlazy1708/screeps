var roleClaimer = {
    run: function(creep) {
        
        var target = Game.rooms['E44S32'].controller;
        console.log(creep.claimController(target));
        if(creep.claimController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
	}
};

module.exports = roleClaimer;