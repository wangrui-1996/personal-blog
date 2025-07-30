'use client'

import { useState } from 'react'
import { MessageCircle, LogOut, Settings, User } from 'lucide-react'
import { QQUser, qqLogin, qqLogout } from '@/lib/qq-integration'
import QQChat from './QQChat'

interface QQLoginProps {
  className?: string
}

export default function QQLogin({ className = '' }: QQLoginProps) {
  const [user, setUser] = useState<QQUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await qqLogin()
      if (result.success && result.user) {
        setUser(result.user)
      } else {
        console.error('QQ login failed:', result.error)
      }
    } catch (error) {
      console.error('QQ login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await qqLogout()
      setUser(null)
      setShowChat(false)
      setChatMinimized(false)
    } catch (error) {
      console.error('QQ logout error:', error)
    }
  }

  const openChat = () => {
    setShowChat(true)
    setChatMinimized(false)
  }

  const closeChat = () => {
    setShowChat(false)
    setChatMinimized(false)
  }

  const minimizeChat = () => {
    setChatMinimized(true)
  }

  if (!user) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            QQ登录
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            登录QQ账号，在博客中直接聊天
          </p>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>登录中...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                <span>使用QQ登录</span>
              </>
            )}
          </button>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              💡 这是演示功能，实际使用需要配置QQ互联开发者账号
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            QQ账号
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={openChat}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="打开聊天"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="设置"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="退出登录"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">
              {user.nickname}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.province} {user.city}
            </div>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full" title="在线"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={openChat}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>打开聊天窗口</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              好友列表
            </button>
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              群聊
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              在线状态
            </span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            你的好友可以看到你在线并与你聊天
          </p>
        </div>
      </div>

      {/* 聊天窗口 */}
      {showChat && !chatMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <QQChat
            user={user}
            onClose={closeChat}
            onMinimize={minimizeChat}
          />
        </div>
      )}

      {/* 最小化的聊天图标 */}
      {chatMinimized && (
        <div className="fixed bottom-4 right-4 z-45">
          <button
            onClick={() => setChatMinimized(false)}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}
