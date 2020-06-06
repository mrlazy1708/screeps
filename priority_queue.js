const pq = {
    top: function(heap){
        return heap[1];
    },
    insert: function(heap, value){
        heap.push(value);
        for(let i=heap.length-1;i>1&&heap.cmp(i,i>>1);i>>=1)[heap[i],heap[i>>1]]=[heap[i>>1],heap[i]];
    },
    remove: function(heap){
        let i;
        if(heap.length>2)heap[1]=heap.pop();
        else heap.pop();
        for(i=1;i<<1<heap.length-1&&!heap.cmp(i,heap.min(i<<1,i<<1|1));)
            if(heap.cmp(i<<1,i<<1|1))[heap[i],heap[i<<1]]=[heap[i<<1],heap[i]],i=i<<1;
            else [heap[i],heap[i<<1|1]]=[heap[i<<1|1],heap[i]],i=i<<1|1;
        if(i<<1==heap.length-1&&!heap.cmp(i,i<<1))[heap[i],heap[i<<1]]=[heap[i<<1],heap[i]];
    }
};

module.exports = pq;