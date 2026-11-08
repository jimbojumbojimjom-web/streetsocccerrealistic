const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_req, res) => res.json({ ok: true, service: 'street-soccer' }));
const rooms = new Map();
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
function makeCode(){ let c=''; do { c=''; for(let i=0;i<4;i++) c+=alphabet[Math.floor(Math.random()*alphabet.length)]; } while(rooms.has(c)); return c; }
function publicLobby(room){ return { code: room.code, hostId: room.hostId, players: [...room.players.values()] }; }
function publish(room){ io.to(room.code).emit('lobby-updated', publicLobby(room)); }
io.on('connection', socket => {
  socket.on('create-lobby', (data={}, ack) => {
    const code=makeCode(), room={code,hostId:socket.id,players:new Map()};
    room.players.set(socket.id,{id:socket.id,nick:String(data.name||'Host').slice(0,14),host:true});
    rooms.set(code,room); socket.join(code); socket.data.room=code;
    if(typeof ack==='function') ack({ok:true,lobby:{code,hostId:socket.id}}); publish(room);
  });
  socket.on('join-lobby', (data={}, ack) => {
    const code=String(data.code||'').toUpperCase(),room=rooms.get(code);
    if(!room){if(typeof ack==='function')ack({ok:false,error:'Lobby not found'});return;}
    if(room.players.size>=20){if(typeof ack==='function')ack({ok:false,error:'Lobby is full'});return;}
    room.players.set(socket.id,{id:socket.id,nick:String(data.name||'Player').slice(0,14),host:false});
    socket.join(code);socket.data.room=code;
    if(typeof ack==='function')ack({ok:true,lobby:{code,hostId:room.hostId}});publish(room);
  });
  socket.on('game-event', packet => { const room=rooms.get(socket.data.room); if(!room||!packet||typeof packet.event!=='string')return; socket.to(room.code).emit('game-event',{event:packet.event,data:packet.data,peer:socket.id}); });
  socket.on('leave-lobby', ack => { leaveRoom(socket); if(typeof ack==='function')ack({ok:true}); });
  socket.on('disconnect',()=>leaveRoom(socket));
});
function leaveRoom(socket){
  const code=socket.data.room,room=rooms.get(code);if(!room)return;
  room.players.delete(socket.id);socket.leave(code);socket.data.room=null;
  if(socket.id===room.hostId){io.to(code).emit('lobby-closed',{reason:'The host left the lobby.'});rooms.delete(code);return;}
  if(!room.players.size)rooms.delete(code);else publish(room);
}
const port=process.env.PORT||3000;server.listen(port,()=>console.log(`Street Soccer server listening on ${port}`));
