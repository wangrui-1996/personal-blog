'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Calendar, User, Plus, Mail, Settings } from 'lucide-react'
import Navigation from '@/components/Navigation'
import MomentCard from '@/components/MomentCard'
import NewMomentForm from '@/components/NewMomentForm'
import EditMomentForm from '@/components/EditMomentForm'
import BlogManager from '@/components/BlogManager'
import QQLogin from '@/components/QQLogin'
import WeChatLogin from '@/components/WeChatLogin'
import EmailLogin from '@/components/EmailLogin'
import { Moment, getAllMoments } from '@/lib/moments'
import { useAuth } from '@/lib/auth'

export default function Home() {
  const [moments, setMoments] = useState<Moment[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewMomentForm, setShowNewMomentForm] = useState(false)
  const [showBlogManager, setShowBlogManager] = useState(false)
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null)
  const [showQQLogin, setShowQQLogin] = useState(false)
  const [showWeChatLogin, setShowWeChatLogin] = useState(false)
  const [showEmailLogin, setShowEmailLogin] = useState(false)
  const { isAdmin, mounted } = useAuth()

  useEffect(() => {
    loadMoments()
  }, [])

  const loadMoments = async () => {
    try {
      const data = await getAllMoments()
      setMoments(data)
    } catch (error) {
      console.error('Failed to load moments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMomentAdded = () => {
    // 重新加载所有动态以确保数据一致性
    loadMoments()
    setShowNewMomentForm(false)
  }

  const handleLike = (id: string) => {
    setMoments(moments.map(moment =>
      moment.id === id
        ? { ...moment, likes: (moment.likes || 0) + 1 }
        : moment
    ))
  }

  const handleComment = (_id: string, _comment: string) => {
    // 刷新数据以获取最新评论
    loadMoments()
  }

  const handleEditMoment = (moment: Moment) => {
    setEditingMoment(moment)
    setShowNewMomentForm(false) // 关闭新建表单
  }

  const handleUpdateMoment = (updatedMoment: Moment) => {
    // 更新动态列表
    setMoments(moments.map(moment =>
      moment.id === updatedMoment.id ? updatedMoment : moment
    ))
    setEditingMoment(null)
  }

  const handleDeleteMoment = (momentId: string) => {
    // 从列表中删除动态
    setMoments(moments.filter(moment => moment.id !== momentId))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            我的日常
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            记录生活中的美好瞬间
          </p>
        </div>

        {/* 快捷导航 */}
        <div className={`grid ${mounted && isAdmin ? 'grid-cols-3' : 'grid-cols-1'} gap-4 mb-6`}>
          <a
            href="/blog"
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">技术博客</span>
          </a>
          {mounted && isAdmin && (
            <>
              <button
                onClick={() => setShowBlogManager(true)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">博客管理</span>
              </button>
              <button
                onClick={() => setShowNewMomentForm(!showNewMomentForm)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Plus className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">发布动态</span>
              </button>
            </>
          )}
        </div>

        {/* 联系方式 - 仅博主可见 */}
        {mounted && isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              联系我
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setShowQQLogin(true)}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">🐧</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">QQ</span>
              </button>
              <button
                onClick={() => setShowWeChatLogin(true)}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">💬</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">微信</span>
              </button>
              <button
                onClick={() => setShowEmailLogin(true)}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">邮箱</span>
              </button>
            </div>
          </div>
        )}

        {/* 发布新动态表单 - 仅博主可见 */}
        {mounted && isAdmin && showNewMomentForm && !editingMoment && (
          <NewMomentForm onMomentAdded={handleMomentAdded} />
        )}

        {/* 编辑动态表单 - 仅博主可见 */}
        {mounted && isAdmin && editingMoment && (
          <EditMomentForm
            moment={editingMoment}
            onSave={handleUpdateMoment}
            onCancel={() => setEditingMoment(null)}
          />
        )}

        {/* 动态列表 */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">加载中...</p>
            </div>
          ) : moments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                还没有动态
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                开始记录你的第一个美好瞬间吧！
              </p>
              <button
                onClick={() => setShowNewMomentForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                发布第一条动态
              </button>
            </div>
          ) : (
            moments.map((moment) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                onLike={handleLike}
                onComment={handleComment}
                onEdit={handleEditMoment}
                onDelete={handleDeleteMoment}
              />
            ))
          )}
        </div>

        {/* 加载更多 */}
        {moments.length > 0 && (
          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              加载更多动态
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; 2024 我的个人博客. 记录生活，分享美好.
          </p>
        </div>
      </footer>

      {/* 博客管理弹出框 - 仅博主可见 */}
      {mounted && isAdmin && showBlogManager && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-50 sm:top-20"
            onClick={() => setShowBlogManager(false)}
          />
          {/* 博客管理弹出框 */}
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 sm:top-24 md:top-28">
            <BlogManager onClose={() => setShowBlogManager(false)} />
          </div>
        </>
      )}

      {/* 登录组件 - 仅博主可见 */}
      {isAdmin && showQQLogin && <QQLogin />}
      {isAdmin && showWeChatLogin && <WeChatLogin />}
      {isAdmin && showEmailLogin && <EmailLogin />}
    </div>
  );
}
