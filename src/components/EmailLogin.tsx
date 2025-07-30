'use client'

import { useState } from 'react'
import { Mail, LogOut, Settings, Eye, EyeOff, Inbox } from 'lucide-react'
import { EmailAccount, emailLogin, emailLogout, getProviderIcon } from '@/lib/email-integration'
import EmailClient from './EmailClient'

interface EmailLoginProps {
  className?: string
}

export default function EmailLogin({ className = '' }: EmailLoginProps) {
  const [account, setAccount] = useState<EmailAccount | null>(null)
  const [loading, setLoading] = useState(false)
  const [showClient, setShowClient] = useState(false)
  const [clientMinimized, setClientMinimized] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setError('请输入邮箱和密码')
      return
    }

    setLoading(true)
    setError('')
    try {
      const result = await emailLogin(loginData.email, loginData.password)
      if (result.success && result.account) {
        setAccount(result.account)
        setLoginData({ email: '', password: '' })
      } else {
        setError(result.error || '登录失败')
      }
    } catch (error) {
      console.error('Email login error:', error)
      setError('登录过程中发生错误')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await emailLogout()
      setAccount(null)
      setShowClient(false)
      setClientMinimized(false)
    } catch (error) {
      console.error('Email logout error:', error)
    }
  }

  const openClient = () => {
    setShowClient(true)
    setClientMinimized(false)
  }

  const closeClient = () => {
    setShowClient(false)
    setClientMinimized(false)
  }

  const minimizeClient = () => {
    setClientMinimized(true)
  }

  if (!account) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            邮箱登录
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            登录邮箱账号，在博客中直接收发邮件
          </p>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="邮箱地址"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="密码"
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !loginData.email || !loginData.password}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>登录中...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>登录邮箱</span>
                </>
              )}
            </button>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              支持 Gmail、Outlook、QQ邮箱、163邮箱等
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              💡 这是演示功能，实际使用需要配置邮箱服务商API
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
            邮箱账号
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={openClient}
              className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              title="打开邮箱"
            >
              <Inbox className="w-4 h-4" />
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
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-lg">{getProviderIcon(account.provider)}</span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">
              {account.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {account.email}
            </div>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full" title="已连接"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={openClient}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Inbox className="w-4 h-4" />
            <span>打开邮箱</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              收件箱
            </button>
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
              写邮件
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              邮箱已连接
            </span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400">
            可以在博客中直接收发邮件，管理邮箱
          </p>
        </div>
      </div>

      {/* 邮箱客户端 */}
      {showClient && !clientMinimized && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <EmailClient
            account={account}
            onClose={closeClient}
            onMinimize={minimizeClient}
          />
        </div>
      )}

      {/* 最小化的邮箱图标 */}
      {clientMinimized && (
        <div className="fixed bottom-4 right-32 z-45">
          <button
            onClick={() => setClientMinimized(false)}
            className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <Mail className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}
