'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  MessageCircle,
  Search,
  Trash2,
  Check,
  X,
  Minimize2,
  Settings,
  Bell
} from 'lucide-react'
import {
  UnifiedMessage,
  MessageStats,
  PlatformStatus,
  getAllUnifiedMessages,
  getMessageStats,
  getPlatformStatus,
  markUnifiedMessageAsRead,
  deleteUnifiedMessage,
  getMessagesByType,
  searchMessages,
  formatUnifiedTime,
  getPlatformIcon,
  getPlatformColor,
  getPlatformTextColor
} from '@/lib/message-center'

interface MessageCenterProps {
  onClose?: () => void
  onMinimize?: () => void
}

export default function MessageCenter({ onClose, onMinimize }: MessageCenterProps) {
  const [messages, setMessages] = useState<UnifiedMessage[]>([])
  const [stats, setStats] = useState<MessageStats | null>(null)
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'qq' | 'wechat' | 'email'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<UnifiedMessage | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      handleSearch()
    } else {
      handleFilter(selectedFilter)
    }
  }, [searchQuery, selectedFilter, handleSearch])

  const loadData = async () => {
    setLoading(true)
    try {
      const [messagesData, statsData, statusData] = await Promise.all([
        getAllUnifiedMessages(),
        getMessageStats(),
        getPlatformStatus()
      ])
      setMessages(messagesData)
      setStats(statsData)
      setPlatformStatus(statusData)
    } catch (error) {
      console.error('Failed to load message center data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = async (type: 'all' | 'qq' | 'wechat' | 'email') => {
    try {
      const filteredMessages = await getMessagesByType(type)
      setMessages(filteredMessages)
      setSelectedFilter(type)
    } catch (error) {
      console.error('Failed to filter messages:', error)
    }
  }

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      handleFilter(selectedFilter)
      return
    }

    try {
      const searchResults = await searchMessages(searchQuery)
      setMessages(searchResults)
    } catch (error) {
      console.error('Failed to search messages:', error)
    }
  }, [searchQuery, selectedFilter])

  const handleMarkAsRead = async (messageId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await markUnifiedMessageAsRead(messageId)
      setMessages(messages.map(m => m.id === messageId ? { ...m, read: true } : m))
      if (stats) {
        setStats({ ...stats, unread: stats.unread - 1 })
      }
    } catch (error) {
      console.error('Failed to mark message as read:', error)
    }
  }

  const handleDelete = async (messageId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    try {
      await deleteUnifiedMessage(messageId)
      setMessages(messages.filter(m => m.id !== messageId))
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const handleMessageClick = (message: UnifiedMessage) => {
    setSelectedMessage(message)
    if (!message.read) {
      markMessageAsReadWithoutEvent(message.id)
    }
  }

  const markMessageAsReadWithoutEvent = async (messageId: string) => {
    try {
      await markUnifiedMessageAsRead(messageId)
      setMessages(messages.map(m => m.id === messageId ? { ...m, read: true } : m))
      if (stats) {
        setStats({ ...stats, unread: stats.unread - 1 })
      }
    } catch (error) {
      console.error('Failed to mark message as read:', error)
    }
  }

  return (
    <div className="w-full max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-12rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-semibold">消息中心</h2>
            {stats && (
              <p className="text-sm opacity-90">
                {stats.total} 条消息，{stats.unread} 条未读
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onMinimize}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 移动端筛选栏 */}
      <div className="lg:hidden border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索消息..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'all', label: '全部', icon: '💌' },
            { key: 'qq', label: 'QQ', icon: '🐧' },
            { key: 'wechat', label: '微信', icon: '💬' },
            { key: 'email', label: '邮件', icon: '📧' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilter(filter.key as 'all' | 'qq' | 'wechat' | 'email')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                selectedFilter === filter.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{filter.icon}</span>
              <span className="text-sm">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hidden lg:block">
          <div className="p-4">
            {/* 搜索框 */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索消息..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            {/* 平台状态 */}
            {platformStatus && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">平台状态</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🐧</span>
                      <span className="text-sm">QQ</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {platformStatus.qq.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {platformStatus.qq.unreadCount}
                        </span>
                      )}
                      <div className={`w-2 h-2 rounded-full ${platformStatus.qq.connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">💬</span>
                      <span className="text-sm">微信</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {platformStatus.wechat.unreadCount > 0 && (
                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {platformStatus.wechat.unreadCount}
                        </span>
                      )}
                      <div className={`w-2 h-2 rounded-full ${platformStatus.wechat.connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📧</span>
                      <span className="text-sm">邮箱</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {platformStatus.email.unreadCount > 0 && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {platformStatus.email.unreadCount}
                        </span>
                      )}
                      <div className={`w-2 h-2 rounded-full ${platformStatus.email.connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 筛选器 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">筛选</h3>
              <div className="space-y-1">
                {[
                  { key: 'all', label: '全部消息', icon: '💌' },
                  { key: 'qq', label: 'QQ消息', icon: '🐧' },
                  { key: 'wechat', label: '微信消息', icon: '💬' },
                  { key: 'email', label: '邮件消息', icon: '📧' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => handleFilter(filter.key as 'all' | 'qq' | 'wechat' | 'email')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      selectedFilter === filter.key
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span className="text-sm">{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 消息列表 */}
        <div className="w-full lg:w-80 border-r border-gray-200 dark:border-gray-700 lg:border-r">
          <div className="h-full overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                没有消息
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${!message.read ? 'bg-blue-25 dark:bg-blue-950/20' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPlatformIcon(message.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm truncate ${!message.read ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-white`}>
                          {message.from}
                        </div>
                        <div className={`text-xs ${getPlatformTextColor(message.type)}`}>
                          {message.platform}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!message.read && (
                        <button
                          onClick={(e) => handleMarkAsRead(message.id, e)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-blue-500"
                          title="标记为已读"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(message.id, e)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400 hover:text-red-500"
                        title="删除"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  {message.subject && (
                    <div className={`text-sm truncate mb-1 ${!message.read ? 'font-medium' : ''} text-gray-700 dark:text-gray-300`}>
                      {message.subject}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                    {message.content.substring(0, 60)}...
                  </div>
                  
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {formatUnifiedTime(message.timestamp)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 消息详情 */}
        <div className="flex-1 flex flex-col hidden lg:flex">
          {selectedMessage ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getPlatformIcon(selectedMessage.type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedMessage.subject || `来自 ${selectedMessage.from} 的消息`}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedMessage.platform} • {formatUnifiedTime(selectedMessage.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(selectedMessage.type)} text-white`}>
                    {selectedMessage.platform}
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  发送者: {selectedMessage.from}
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-900 dark:text-white">
                    {selectedMessage.content}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>选择一条消息查看详情</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
