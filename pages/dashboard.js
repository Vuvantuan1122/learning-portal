import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard(){
  const [me,setMe]=useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) return
    axios.get('/api/auth/me',{headers:{authorization:token}}).then(r=>setMe(r.data))
  },[])
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded p-6 shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {me ? (
          <div className="mt-4">
            <p><strong>{me.name}</strong> — {me.email}</p>
            <p>Điểm đúng tổng: {me.stats?.correctCount || 0} / {me.stats?.totalAttempts || 0}</p>
          </div>
        ) : <p>Đang tải...</p>}
      </div>
    </div>
  )
}
