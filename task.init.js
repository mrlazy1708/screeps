const taskInit = {
    run: function() {/*
        Object.defineProperty(Source.prototype, 'memory', {
            get: function() {
                if(_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if(!_.isObject(Memory.sources)) {
                    return undefined;
                }
                return Memory.sources[this.id] = Memory.sources[this.id] || {};
            },
            set: function(value) {
                if(_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if(!_.isObject(Memory.sources)) {
                    throw new Error('Could not set source memory');
                }
                Memory.sources[this.id] = value;
            }
        });*/
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
                    throw new Error('Could not set structure memory');
                }
                Memory.myStructuresMemory[this.id] = value;
            }
        });
    }
};

module.exports = taskInit;