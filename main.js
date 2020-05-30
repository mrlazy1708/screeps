var taskInit = require('task.init');
var taskNotify = require('task.notify');
var taskUpgrade = require('task.upgrade');

module.exports.loop = function () {
	taskInit.run();
    taskUpgrade.run();
    if(Game.time % 300 == 0) {
        taskNotify.run();
    }
}