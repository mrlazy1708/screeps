const taskDesign = {
    run: function(room) {
        let pos = [room.controller.pos], sources = room.find(FIND_SOURCES), minerals = room.find(FIND_MINERALS);
        for(let id in sources) {
            pos.push(sources[id].pos);
        }
        for(let id in minerals) {
            pos.push(minerals[id].pos);
        }
        for(let i=1; i<=10; i++) {
            let cx = 0, cy = 0;
            for(let id in pos) {
                cx += pos[id].x;
                cy += pos[id].y;
            }
            cx = Math.round(cx / pos.length);
            cy = Math.round(cy / pos.length);
            let centp = new RoomPosition({x: cx, y: cy, roomName: room.name});;
            for(let id in pos) {
                let next = pos[id].findPathTo(centp)[0];
                pos[id] = new RoomPosition({x: next.x, y: next.y, roomName: room.name});
                room.createConstructionSite(pos[id], STRUCTURE_ROAD);
            }
        }
    }
};

module.exports = taskDesign;