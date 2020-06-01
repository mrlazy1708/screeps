var roleClaimer = {
    run: function(creep) {
        
        var target = Game.getObjectById('5bbcaf9b9099fc012e63ade8');
        //creep.moveTo(new RoomPosition(36,14,'E44S32'));
        console.log(target);
        if(creep.claimController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
	}
};

module.exports = roleClaimer;