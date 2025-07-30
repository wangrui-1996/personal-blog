'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, BookOpen, User, MessageCircle, LogIn, LogOut } from 'lucide-react'
import MessageCenter from './MessageCenter'
import AdminLogin from './AdminLogin'
import { useAuth } from '@/lib/auth'

const navigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '博客', href: '/blog', icon: BookOpen },
  { name: '关于', href: '/about', icon: User },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMessageCenter, setShowMessageCenter] = useState(false)
  const [messageCenterMinimized, setMessageCenterMinimized] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const pathname = usePathname()
  const { user, isAdmin, mounted, login, logout } = useAuth()

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">我的个人博客</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* 博主专用功能 - 只在组件挂载后显示 */}
            {mounted && isAdmin && (
              <>
                {/* 消息中心按钮 */}
                <button
                  onClick={() => setShowMessageCenter(true)}
                  className="relative flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>消息</span>
                  {/* 未读消息提示 */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                </button>
              </>
            )}

            {/* 登录/退出按钮 - 只在组件挂载后显示 */}
            {mounted && (
              isAdmin ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>退出</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>博主登录</span>
                </button>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">打开菜单</span>
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 消息中心 - 仅博主可见 */}
      {mounted && isAdmin && showMessageCenter && !messageCenterMinimized && (
        <>
          {/* 背景遮罩 - 不覆盖导航栏 */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-50 sm:top-20"
            onClick={() => setShowMessageCenter(false)}
          />
          {/* 消息中心弹出框 */}
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[900px] px-4 sm:top-24 md:top-28">
            <MessageCenter
              onClose={() => setShowMessageCenter(false)}
              onMinimize={() => setMessageCenterMinimized(true)}
            />
          </div>
        </>
      )}

      {/* 最小化的消息中心图标 - 仅博主可见 */}
      {mounted && isAdmin && messageCenterMinimized && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={() => setMessageCenterMinimized(false)}
            className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>
        </div>
      )}

      {/* 博主登录弹窗 */}
      {showAdminLogin && (
        <AdminLogin
          onLogin={login}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
    </header>
  )
}
