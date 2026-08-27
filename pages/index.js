import Link from 'next/link'

export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">Learning Portal</h1>
        <p className="text-gray-600 mb-4">Nền tảng luyện thi trắc nghiệm, solo battle realtime, phân tích điểm mạnh/yếu.</p>
        <div className="flex gap-3">
          <Link href="/register"><a className="px-4 py-2 bg-blue-600 text-white rounded">Đăng ký</a></Link>
          <Link href="/login"><a className="px-4 py-2 border border-blue-600 text-blue-600 rounded">Đăng nhập</a></Link>
          <Link href="/practice"><a className="px-4 py-2 border bg-gray-100 rounded">Luyện tập</a></Link>
        </div>
      </div>
    </div>
  )
}
