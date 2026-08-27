import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter()
  async function submit(e){
    e.preventDefault();
    try{
      await axios.post('/api/auth/register',{name,email,password})
      alert('Đăng ký thành công. Vui lòng đăng nhập.')
      router.push('/login')
    }catch(err){
      alert(err.response?.data?.message || 'Lỗi')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Đăng ký</h2>
        <input className="w-full p-2 border rounded mb-2" placeholder="Tên" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Mật khẩu" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Đăng ký</button>
      </form>
    </div>
  )
}
