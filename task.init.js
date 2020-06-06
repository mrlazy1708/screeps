const taskInit = {
    run: function() {
        global.collect = [0];
        global.sources = [0];
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
        Array.prototype.cmp=function(i,j){
            if(this[i].time==this[j].time)return this[i].pri<this[j].pri;
            return this[i].time<this[j].time;
        }
        Array.prototype.min=function(i,j){
            return this.cmp(i,j)?i:j;
        }
        Array.prototype.insert=function(value){
            this.push(value);
            for(let i=this.length-1;i>1&&this.cmp(i,i>>1);i>>=1)[this[i],this[i>>1]]=[this[i>>1],this[i]];
        }
        Array.prototype.top=function(){
            return this[1];
        }
        Array.prototype.remove=function(){
            let i;
            if(this.length>2)this[1]=this.pop();
            else this.pop();
            for(i=1;i<<1<this.length-1&&!this.cmp(i,this.min(i<<1,i<<1|1));)
                if(this.cmp(i<<1,i<<1|1))[this[i],this[i<<1]]=[this[i<<1],this[i]],i=i<<1;
                else [this[i],this[i<<1|1]]=[this[i<<1|1],this[i]],i=i<<1|1;
            if(i<<1==this.length-1&&!this.cmp(i,i<<1))[this[i],this[i<<1]]=[this[i<<1],this[i]];
        }
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