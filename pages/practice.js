import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Practice(){
  const [questions,setQuestions]=useState([])
  useEffect(()=>{ axios.get('/api/questions').then(r=>setQuestions(r.data)) },[])
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Luyện tập</h1>
        {questions.map(q=> (
          <div key={q._id} className="bg-white p-4 rounded mb-3 shadow">
            <p className="font-medium">{q.text}</p>
            <div className="mt-2 grid gap-2">
              {q.options.map(o=> <button key={o.id} className="text-left p-2 border rounded">{o.id}. {o.text}</button>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
