import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Leaderboard(){
  const [list,setList]=useState([])
  useEffect(()=>{ axios.get('/api/leaderboard').then(r=>setList(r.data)) },[])
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
        <ol className="list-decimal pl-6">
          {list.map((u,i)=> (
            <li key={u.userId} className="mb-2">{u.name || u.userId} — Accuracy: {(u.accuracy*100).toFixed(1)}% ({u.correct}/{u.attempts})</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
