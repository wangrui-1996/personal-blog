'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Calendar, User, Plus, Mail, Settings } from 'lucide-react'
import { Moment, getAllMoments } from '@/lib/moments'
import { useAuth } from '@/lib/auth'
import Navigation from '@/components/Navigation'
import MomentCard from '@/components/MomentCard'
import NewMomentForm from '@/components/NewMomentForm'
import EditMomentForm from '@/components/EditMomentForm'
import BlogManager from '@/components/BlogManager'
import ContactMethods from '@/components/ContactMethods'
import QQLogin from '@/components/QQLogin'
import WeChatLogin from '@/components/WeChatLogin'
import EmailLogin from '@/components/EmailLogin'

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
      setLoading(true)
      const momentsData = await getAllMoments()
      setMoments(momentsData)
    } catch (error) {
      console.error('Failed to load moments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMomentAdded = () => {
    loadMoments()
    setShowNewMomentForm(false)
  }

  const handleLike = (id: string) => {
    // 处理点赞逻辑
    console.log('Liked moment:', id)
  }

  const handleComment = () => {
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
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            欢迎来到我的个人博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            分享技术见解，记录生活点滴
          </p>
        </div>

        {/* 快捷导航 */}
        <div className={`grid ${mounted && isAdmin ? 'grid-cols-3' : 'grid-cols-1'} gap-4 mb-6`}>
          <Link
            href="/blog"
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center block"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">技术博客</span>
          </Link>
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
          <div className="mb-6">
            <ContactMethods
              onQQClick={() => setShowQQLogin(true)}
              onWeChatClick={() => setShowWeChatLogin(true)}
              onEmailClick={() => setShowEmailLogin(true)}
            />
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

        {/* 动态时间线 */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              最新动态
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">加载中...</p>
            </div>
          ) : moments.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">还没有动态，快来发布第一条吧！</p>
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
      </main>

      {/* 博客管理弹出框 - 仅博主可见 */}
      {mounted && isAdmin && showBlogManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <BlogManager onClose={() => setShowBlogManager(false)} />
          </div>
        </div>
      )}

      {/* QQ登录弹出框 */}
      {showQQLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <QQLogin onClose={() => setShowQQLogin(false)} />
          </div>
        </div>
      )}

      {/* 微信登录弹出框 */}
      {showWeChatLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <WeChatLogin onClose={() => setShowWeChatLogin(false)} />
          </div>
        </div>
      )}

      {/* 邮箱登录弹出框 */}
      {showEmailLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <EmailLogin onClose={() => setShowEmailLogin(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
