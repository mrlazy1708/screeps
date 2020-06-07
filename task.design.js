const taskDesign = {
    run: function(room) {
        let tot=[],dx=[1,-1,0,0],dy=[0,0,1,-1],terrain=room.getTerrain();
        for(let x=0;x<50;x++){
            tot[x]=[];
            for(let y=0;y<50;y++)
                tot[x][y]=0;
        }
        function bfs(pos){
            let maze=[];
            for(let x=0;x<50;x++)
                maze[x]=[];
            for(let q=[{x:pos.x,y:pos.y,s:0}];q.length;){
                let c=q.shift();
                for(let i=0;i<4;i++){
                    let n={x:c.x+dx[i],y:c.y+dy[i],s:c.s+1};
                    if(terrain.get(n.x,n.y)!=TERRAIN_MASK_WALL&&maze[n.x][n.y]==undefined){
                        tot[n.x][n.y]+=(maze[n.x][n.y]=n.s);
                        q.push(n);
                    }
                }
            }
        }
        if(room.controller!=undefined)
            bfs(room.comtroller.pos);
        let sources=room.find(FIND_SOURCES);
        for(let id in sources)
            bfs(sources[id].pos);
        let centp={s:1e9+7};
        for(let x=0;x<50;x++)
            for(let y=0;y<50;y++)
                if(tot[x][y]<centp.s)
                    centp={x:x,y:y,s:tot[x][y]};
        console.log(centp);
    }
};

module.exports = taskDesign;