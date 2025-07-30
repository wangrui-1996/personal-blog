import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 网站部署成功！
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          这是一个测试页面，用来验证网站是否正常运行。
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">部署信息</h2>
          <ul className="text-left space-y-2">
            <li>✅ Next.js 15.4.5</li>
            <li>✅ TypeScript</li>
            <li>✅ Tailwind CSS</li>
            <li>✅ Vercel 部署</li>
          </ul>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
