import Link from 'next/link'
import { ArrowLeft, User, Heart, Code, Book, Camera, Music } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Navigation />

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">关于我</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">了解更多关于我的信息</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">你好，我是博主</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                欢迎来到我的个人博客！我是一个热爱生活、喜欢学习的人。在这里，我会分享我的日常生活、
                学习心得、技术笔记以及一些有趣的想法。希望通过这个平台能够与更多志同道合的朋友交流。
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                我相信每个人都有自己独特的故事和见解，通过分享和交流，我们可以互相学习，共同成长。
                如果你对我的文章有任何想法或建议，欢迎随时与我联系！
              </p>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">兴趣爱好</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">编程</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">热爱技术，享受编程的乐趣</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">阅读</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">通过阅读拓展视野</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">摄影</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">记录生活中的美好瞬间</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">音乐</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">音乐是生活的调味剂</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">旅行</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">探索世界，体验不同文化</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">技能特长</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">前端开发</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">React/Next.js</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">80%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">JavaScript/TypeScript</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">90%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 dark:text-white font-medium">UI/UX设计</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">70%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">想要了解更多？</h2>
          <p className="mb-6">如果你想与我交流或合作，欢迎通过以下方式联系我</p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            联系我
          </Link>
        </div>
      </main>
    </div>
  )
}
