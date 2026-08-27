import { useEffect } from 'react'
import io from 'socket.io-client'

let socket
export default function Solo(){
  useEffect(()=>{
    // initialize socket by calling API route to ensure server is set up
    fetch('/api/socket')
    socket = io()
    const name = 'Guest_' + Math.floor(Math.random()*1000)
    socket.emit('join',{ userId: 'guest', name })
    socket.on('matched', (d)=>{ alert('Matched with ' + d.opponent + ' in room ' + d.room) })
    socket.on('battle:update', (d)=>{ console.log('update', d) })
    return ()=>{ socket.disconnect() }
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">Solo Battle (Demo)</h2>
        <p>Hệ thống sẽ ghép đôi tự động. Đây là demo socket.</p>
      </div>
    </div>
  )
}
