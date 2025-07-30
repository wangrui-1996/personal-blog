'use client'

import { useState } from 'react'
import { MessageCircle, LogOut, Settings, User, QrCode } from 'lucide-react'
import { WeChatUser, wechatLogin, wechatLogout, getGenderText } from '@/lib/wechat-integration'
import WeChatChat from './WeChatChat'

interface WeChatLoginProps {
  className?: string
}

export default function WeChatLogin({ className = '' }: WeChatLoginProps) {
  const [user, setUser] = useState<WeChatUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await wechatLogin()
      if (result.success && result.user) {
        setUser(result.user)
        setShowQR(false)
      } else {
        console.error('WeChat login failed:', result.error)
      }
    } catch (error) {
      console.error('WeChat login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await wechatLogout()
      setUser(null)
      setShowChat(false)
      setChatMinimized(false)
    } catch (error) {
      console.error('WeChat logout error:', error)
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
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            微信登录
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            使用微信扫码登录，在博客中直接聊天
          </p>

          {!showQR ? (
            <button
              onClick={() => setShowQR(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <QrCode className="w-4 h-4" />
              <span>微信扫码登录</span>
            </button>
          ) : (
            <div className="space-y-4">
              {/* 二维码区域 */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-gray-300">
                  <div className="text-center">
                    <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">微信二维码</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  请使用微信扫描二维码登录
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>登录中...</span>
                    </>
                  ) : (
                    <span>模拟登录</span>
                  )}
                </button>
                <button
                  onClick={() => setShowQR(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              💡 这是演示功能，实际使用需要配置微信开放平台账号
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
            微信账号
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={openChat}
              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
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
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">
              {user.nickname}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {getGenderText(user.sex)} • {user.province} {user.city}
            </div>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full" title="在线"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={openChat}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>打开聊天窗口</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              朋友圈
            </button>
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              群聊
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              微信在线
            </span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">
            你的微信好友可以看到你在线并与你聊天
          </p>
        </div>
      </div>

      {/* 聊天窗口 */}
      {showChat && !chatMinimized && (
        <div className="fixed bottom-4 right-20 z-50">
          <WeChatChat
            user={user}
            onClose={closeChat}
            onMinimize={minimizeChat}
          />
        </div>
      )}

      {/* 最小化的聊天图标 */}
      {chatMinimized && (
        <div className="fixed bottom-4 right-20 z-45">
          <button
            onClick={() => setChatMinimized(false)}
            className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}
