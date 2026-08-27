// Socket.io server for solo battles
import { Server } from 'socket.io'
import dbConnect from '../../lib/db'

let players = [] // { socketId, userId, name }

export default async function handler(req,res){
  if(!res.socket.server.io){
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', socket => {
      socket.on('join', (data)=>{
        players.push({ socketId: socket.id, userId: data.userId, name: data.name })
        // try to match
        if(players.length >= 2){
          const a = players.shift()
          const b = players.shift()
          const room = 'room_' + Date.now()
          io.to(a.socketId).emit('matched',{ room, opponent: b.name })
          io.to(b.socketId).emit('matched',{ room, opponent: a.name })
        }
      })
      socket.on('leave', ()=>{
        players = players.filter(p=>p.socketId!==socket.id)
      })
      socket.on('battle:score', (data)=>{
        // broadcast to room
        io.to(data.room).emit('battle:update', data)
      })
    })
  }
  res.end()
}
