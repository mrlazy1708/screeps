var eventNotify = require('event.notify');
var eventUpgrade = require('event.upgrade');

module.exports.loop = function () {
	Object.defineProperty(Structure.prototype, 'memory', {
		configurable: true,
		get: function() {
			if(_.isUndefined(Memory.myStructuresMemory)) {
				Memory.myStructuresMemory = {};
			}
			if(!_.isObject(Memory.myStructuresMemory)) {
				return undefined;
			}
			return Memory.myStructuresMemory[this.id] = Memory.myStructuresMemory[this.id] || {};
		},
		set: function(value) {
			if(_.isUndefined(Memory.myStructuresMemory)) {
				Memory.myStructuresMemory = {};
			}
			if(!_.isObject(Memory.myStructuresMemory)) {
				throw new Error('Could not set source memory');
			}
			Memory.myStructuresMemory[this.id] = value;
		}
	});
    eventUpgrade.run();
    if(Game.time % 300 == 0) {
        eventNotify.run();
    }
}