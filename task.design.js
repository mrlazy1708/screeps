const taskDesign = {
    run: function(room) {
        let centp, pos = [room.controller.pos], sources = room.find(FIND_SOURCES), minerals = room.find(FIND_MINERALS);
        for(let id in sources) pos.push(sources[id].pos);
        for(let id in minerals) pos.push(minerals[id].pos);
        for(let i=1; i<=100; i++) {
            let cx = 0, cy = 0;
            for(let id in pos) {
                cx += pos[id].x;
                cy += pos[id].y;
            }
            cx = Math.round(cx / pos.length);
            cy = Math.round(cy / pos.length);
            centp = new RoomPosition(cx, cy, room.name);;
            for(let id in pos) {
                let next = pos[id].findPathTo(centp)[0];
                pos[id] = new RoomPosition(next.x, next.y, room.name);
            }
        }
        for(let id in sources) {
            for(let pos = sources[id].pos; pos != centp; ) {
                let next = pos.findPathTo(centp)[0];
                room.createConstructionSite(pos = new RoomPosition(next.x, next.y, room.name), STRUCTURE_ROAD);
            }
        }
    }
};

module.exports = taskDesign;