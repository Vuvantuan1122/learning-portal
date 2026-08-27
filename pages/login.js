import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter()
  async function submit(e){
    e.preventDefault();
    try{
      const r = await axios.post('/api/auth/login',{email,password})
      localStorage.setItem('token', r.data.token)
      alert('Đăng nhập thành công')
      router.push('/dashboard')
    }catch(err){
      alert(err.response?.data?.message || 'Lỗi')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
        <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Mật khẩu" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Đăng nhập</button>
      </form>
    </div>
  )
}
