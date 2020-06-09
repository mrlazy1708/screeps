const taskInit = {
    run: function() {
        if(Memory.task == undefined) {
            Memory.task = {spawn: [0], sources: [0], collect: [0]};
        }

        Array.prototype.Cmp = function(i, j) {
            if(i.time == j.time)return i.pri < j.pri;
            return i.time < j.time;
        }
        Array.prototype.Top =  function() {
            return this[1];
        }
        Array.prototype.Push = function(value){
            this.push(value);
            for(let i=this.length-1;i>1&&this.Cmp(this[i],this[i>>1]);i>>=1)[this[i],this[i>>1]]=[this[i>>1],this[i]];
        }
        Array.prototype.Pop = function(){
            if(this.length>2)this[1]=this.pop();
            else this.pop();
            for(let i=1;i<<1<this.length-1&&!this.Cmp(this[i],this.Cmp(this[i<<1],this[i<<1|1])?this[i<<1]:this[i<<1|1]);)
                if(this.Cmp(this[i<<1],this[i<<1|1]))[this[i],this[i<<1]]=[this[i<<1],this[i]],i=i<<1;
                else [this[i],this[i<<1|1]]=[this[i<<1|1],this[i]],i=i<<1|1;
            if(this.length&1 && this.Cmp(this[this.length-1],this[this.length>>1]))[this[this.length-1],this[this.length>>1]]=[this[this.length>>1],this[this.length-1]];
        }
        Array.prototype.Delete = function(index) {
            this[index] = this[this.length-1];
            this.pop();
        }

        RoomPosition.prototype.Range = function(pos) {
            let u1 = /^([WE])([0-9]+)([NS])([0-9]+)$/.exec(this.roomName), u2 = /^([WE])([0-9]+)([NS])([0-9]+)$/.exec(pos.roomName);
            return Math.max(
                Math.abs( (this.x+(Number(u1[2])+1) * (u1[1]=='W'?-50:50)) - (pos.x+(1+Number(u2[2])) * (u2[1]=='W'?-50:50)) ),
                Math.abs( (this.y+(Number(u1[4])+1) * (u1[3]=='S'?-50:50)) - (pos.y+(1+Number(u2[4])) * (u2[3]=='S'?-50:50)) )
            );
        }
        RoomPosition.prototype.Find = function(arr) {
            let min = 1e9, index;
            for(let i in arr) {
                let host = Game.getObjectById(arr[i].hostID);
                if(min > this.range(host.pos)) {
                    min = this.Range(host.pos);
                    index = i;
                }
            }
            return index;
        }
        /*Object.defineProperty(Source.prototype, 'memory', {
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