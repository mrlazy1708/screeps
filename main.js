var eventNotify = require('event.notify');
var eventUpgrade = require('event.upgrade');

module.exports.loop = function () {
    eventUpgrade.run();
    if(Game.time % 300 == 0) {
        eventNotify.run();
    }
}