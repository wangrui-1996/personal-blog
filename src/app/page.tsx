import Link from 'next/link'
import { BookOpen, Calendar, User, Settings } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 简化的导航栏 */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              个人博客
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                首页
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                博客
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                关于
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                联系
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 网站部署成功！
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            欢迎来到我的个人博客，分享技术见解，记录生活点滴
          </p>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/blog"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center block"
          >
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">技术博客</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              分享编程技术、开发经验和学习心得
            </p>
          </Link>

          <Link
            href="/about"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center block"
          >
            <User className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">关于我</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              了解我的背景、技能和兴趣爱好
            </p>
          </Link>

          <Link
            href="/contact"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center block"
          >
            <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">联系方式</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              通过多种方式与我取得联系
            </p>
          </Link>
        </div>

        {/* 状态信息 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🚀 部署状态
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Next.js 15</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tailwind CSS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Vercel 部署</div>
            </div>
          </div>
        </div>

        {/* 测试链接 */}
        <div className="mt-8 text-center">
          <Link
            href="/test"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-5 h-5 mr-2" />
            访问测试页面
          </Link>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 个人博客. 使用 Next.js 构建，部署在 Vercel.
          </p>
        </div>
      </footer>
    </div>
  )
}
