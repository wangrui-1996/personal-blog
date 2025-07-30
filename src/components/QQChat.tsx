'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Smile, Image, Phone, Video, MoreHorizontal, Minimize2, X } from 'lucide-react'
import { 
  QQUser, 
  QQMessage, 
  QQContact, 
  getQQContacts, 
  getQQMessages, 
  sendQQMessage,
  formatMessageTime,
  getStatusText,
  getStatusColor
} from '@/lib/qq-integration'

interface QQChatProps {
  user: QQUser
  onClose?: () => void
  onMinimize?: () => void
}

export default function QQChat({ user, onClose, onMinimize }: QQChatProps) {
  const [contacts, setContacts] = useState<QQContact[]>([])
  const [selectedContact, setSelectedContact] = useState<QQContact | null>(null)
  const [messages, setMessages] = useState<QQMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact.openid)
    }
  }, [selectedContact])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadContacts = async () => {
    try {
      const contactList = await getQQContacts()
      setContacts(contactList)
      if (contactList.length > 0) {
        setSelectedContact(contactList[0])
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (contactId: string) => {
    try {
      const messageList = await getQQMessages(contactId)
      setMessages(messageList)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact || sending) return

    setSending(true)
    try {
      const result = await sendQQMessage(selectedContact.openid, newMessage.trim())
      if (result.success && result.message) {
        setMessages([...messages, result.message])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xs font-bold">QQ</span>
          </div>
          <span className="font-medium text-sm">QQ聊天</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-blue-700 rounded"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-700 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 联系人列表 */}
        <div className="w-24 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">联系人</div>
            <div className="space-y-1">
              {contacts.map((contact) => (
                <button
                  key={contact.openid}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-1 rounded text-left transition-colors ${
                    selectedContact?.openid === contact.openid
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        {contact.nickname[0]}
                      </span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(contact.status)}`}></div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">
                    {contact.nickname}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 聊天区域 */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* 聊天头部 */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {selectedContact.nickname[0]}
                        </span>
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(selectedContact.status)}`}></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {selectedContact.nickname}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {getStatusText(selectedContact.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      <Phone className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      <Video className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
                    暂无聊天记录
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === user.openid ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.from === user.openid ? 'order-2' : 'order-1'}`}>
                        <div className={`p-2 rounded-lg text-sm ${
                          message.from === user.openid
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          {message.content}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatMessageTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Smile className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Image className="w-4 h-4 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入消息..."
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
              选择一个联系人开始聊天
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
