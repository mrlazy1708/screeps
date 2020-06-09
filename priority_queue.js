function cmp(i,j){
    if(i.time==j.time)return i.pri<j.pri;
    return i.time<j.time;
}

function min(i,j){
    return cmp(i,j)?i:j;
}

const pq = {
    top: function(heap){
        return heap[1];
    },
    insert: function(heap, value){
        heap.push(value);
        for(let i=heap.length-1;i>1&&cmp(heap[i],heap[i>>1]);i>>=1)[heap[i],heap[i>>1]]=[heap[i>>1],heap[i]];
    },
    remove: function(heap){
        let i;
        if(heap.length>2)heap[1]=heap.pop();
        else heap.pop();
        for(i=1;i<<1<heap.length-1&&!cmp(heap[i],min(heap[i<<1],heap[i<<1|1]));)
            if(cmp(heap[i<<1],heap[i<<1|1]))[heap[i],heap[i<<1]]=[heap[i<<1],heap[i]],i=i<<1;
            else [heap[i],heap[i<<1|1]]=[heap[i<<1|1],heap[i]],i=i<<1|1;
        if(i<<1==heap.length-1&&!cmp(heap[i],heap[i<<1]))[heap[i],heap[i<<1]]=[heap[i<<1],heap[i]];
    }
};

module.exports = pq;