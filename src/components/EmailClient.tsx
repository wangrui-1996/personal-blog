'use client'

import { useState, useEffect } from 'react'
import { 
  Mail, 
  Star, 
  Trash2, 
  Send, 
  Reply, 
  Forward, 
  Search, 
  Paperclip,
  X,
  Minimize2,
  Inbox,
  Edit
} from 'lucide-react'
import { 
  EmailAccount, 
  EmailMessage, 
  EmailFolder,
  getEmailFolders,
  getEmails,
  getEmailById,
  sendEmail,
  markEmailAsRead,
  toggleEmailStar,
  deleteEmail,
  formatEmailTime
} from '@/lib/email-integration'

interface EmailClientProps {
  account: EmailAccount
  onClose?: () => void
  onMinimize?: () => void
}

export default function EmailClient({ account, onClose, onMinimize }: EmailClientProps) {
  const [folders, setFolders] = useState<EmailFolder[]>([])
  const [emails, setEmails] = useState<EmailMessage[]>([])
  const [selectedFolder, setSelectedFolder] = useState('inbox')
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // 新邮件表单状态
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: ''
  })

  useEffect(() => {
    loadFolders()
    loadEmails(selectedFolder)
  }, [selectedFolder])

  const loadFolders = async () => {
    try {
      const folderList = await getEmailFolders()
      setFolders(folderList)
    } catch (error) {
      console.error('Failed to load folders:', error)
    }
  }

  const loadEmails = async (folder: string) => {
    setLoading(true)
    try {
      const emailList = await getEmails(folder)
      setEmails(emailList)
    } catch (error) {
      console.error('Failed to load emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailClick = async (email: EmailMessage) => {
    setSelectedEmail(email)
    if (!email.read) {
      await markEmailAsRead(email.id)
      setEmails(emails.map(e => e.id === email.id ? { ...e, read: true } : e))
    }
  }

  const handleStar = async (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    await toggleEmailStar(emailId)
    setEmails(emails.map(e => e.id === emailId ? { ...e, starred: !e.starred } : e))
  }

  const handleDelete = async (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    await deleteEmail(emailId)
    setEmails(emails.filter(e => e.id !== emailId))
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const handleSendEmail = async () => {
    if (!composeData.to || !composeData.subject) return

    try {
      const result = await sendEmail({
        to: composeData.to.split(',').map(email => email.trim()),
        cc: composeData.cc ? composeData.cc.split(',').map(email => email.trim()) : undefined,
        bcc: composeData.bcc ? composeData.bcc.split(',').map(email => email.trim()) : undefined,
        subject: composeData.subject,
        content: composeData.content
      })

      if (result.success) {
        setShowCompose(false)
        setComposeData({ to: '', cc: '', bcc: '', subject: '', content: '' })
        if (selectedFolder === 'sent') {
          loadEmails('sent')
        }
      }
    } catch (error) {
      console.error('Failed to send email:', error)
    }
  }

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-[800px] h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span className="font-medium">邮箱 - {account.email}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowCompose(true)}
            className="p-1 hover:bg-blue-700 rounded"
            title="写邮件"
          >
            <Edit className="w-4 h-4" />
          </button>
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
        {/* 侧边栏 */}
        <div className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="p-3">
            <button
              onClick={() => setShowCompose(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mb-4"
            >
              <Edit className="w-4 h-4" />
              <span>写邮件</span>
            </button>

            <div className="space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedFolder === folder.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Inbox className="w-4 h-4" />
                    <span className="text-sm">{folder.name}</span>
                  </div>
                  {folder.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {folder.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 邮件列表 */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索邮件..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredEmails.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                没有邮件
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedEmail?.id === email.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${!email.read ? 'bg-blue-25 dark:bg-blue-950/20' : ''}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm truncate ${!email.read ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-white`}>
                        {email.from}
                      </div>
                      <div className={`text-sm truncate ${!email.read ? 'font-medium' : ''} text-gray-700 dark:text-gray-300`}>
                        {email.subject}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={(e) => handleStar(email.id, e)}
                        className={`p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded ${
                          email.starred ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                      >
                        <Star className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(email.id, e)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
                    {email.content.substring(0, 50)}...
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {formatEmailTime(email.timestamp)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 邮件内容 */}
        <div className="flex-1 flex flex-col">
          {selectedEmail ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Reply className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Forward className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => handleStar(selectedEmail.id, e)}
                      className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                        selectedEmail.starred ? 'text-yellow-500' : 'text-gray-500'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(selectedEmail.id, e)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div>发件人: {selectedEmail.from}</div>
                  <div>收件人: {selectedEmail.to.join(', ')}</div>
                  <div>时间: {formatEmailTime(selectedEmail.timestamp)}</div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-900 dark:text-white">
                    {selectedEmail.content}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              选择一封邮件查看内容
            </div>
          )}
        </div>
      </div>

      {/* 写邮件弹窗 */}
      {showCompose && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[600px] max-h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">写邮件</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <input
                type="email"
                value={composeData.to}
                onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                placeholder="收件人 (多个邮箱用逗号分隔)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                value={composeData.subject}
                onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                placeholder="主题"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <textarea
                value={composeData.content}
                onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
                placeholder="邮件内容..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              />
            </div>
            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm">添加附件</span>
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  取消
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={!composeData.to || !composeData.subject}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>发送</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
