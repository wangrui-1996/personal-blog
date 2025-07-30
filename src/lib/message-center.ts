// 统一消息中心的类型定义和工具函数

export interface UnifiedMessage {
  id: string
  type: 'qq' | 'wechat' | 'email'
  from: string
  to: string
  content: string
  subject?: string // 邮件专用
  timestamp: string
  read: boolean
  avatar?: string
  platform: string
}

export interface MessageStats {
  total: number
  unread: number
  qq: number
  wechat: number
  email: number
}

export interface PlatformStatus {
  qq: {
    connected: boolean
    user?: Record<string, unknown>
    unreadCount: number
  }
  wechat: {
    connected: boolean
    user?: Record<string, unknown>
    unreadCount: number
  }
  email: {
    connected: boolean
    account?: Record<string, unknown>
    unreadCount: number
  }
}

// 模拟统一消息数据
const mockUnifiedMessages: UnifiedMessage[] = [
  {
    id: 'unified_1',
    type: 'qq',
    from: '小明',
    to: '我',
    content: '你好！看到你的博客了，写得很不错！',
    timestamp: '2024-01-20T14:30:00Z',
    read: false,
    avatar: '/api/placeholder/40/40',
    platform: 'QQ'
  },
  {
    id: 'unified_2',
    type: 'email',
    from: 'friend@example.com',
    to: 'your.email@example.com',
    content: '我看到了你的个人博客，做得非常棒！特别是那个日常动态的功能，很有创意。',
    subject: '关于你的博客项目',
    timestamp: '2024-01-20T14:30:00Z',
    read: false,
    platform: '邮箱'
  },
  {
    id: 'unified_3',
    type: 'wechat',
    from: '小张',
    to: '我',
    content: '你的博客做得不错啊！',
    timestamp: '2024-01-20T11:00:00Z',
    read: true,
    avatar: '/api/placeholder/40/40',
    platform: '微信'
  },
  {
    id: 'unified_4',
    type: 'qq',
    from: '技术爱好者',
    to: '我',
    content: '厉害！可以分享一下技术栈吗？',
    timestamp: '2024-01-19T21:00:00Z',
    read: true,
    avatar: '/api/placeholder/40/40',
    platform: 'QQ'
  },
  {
    id: 'unified_5',
    type: 'email',
    from: 'newsletter@techblog.com',
    to: 'your.email@example.com',
    content: '本周技术要闻：React 19 发布候选版本，Next.js 15 新特性预览...',
    subject: '本周技术资讯汇总',
    timestamp: '2024-01-20T09:15:00Z',
    read: true,
    platform: '邮箱'
  }
]

// 获取所有统一消息
export async function getAllUnifiedMessages(): Promise<UnifiedMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedMessages = mockUnifiedMessages.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      resolve(sortedMessages)
    }, 500)
  })
}

// 获取消息统计
export async function getMessageStats(): Promise<MessageStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = mockUnifiedMessages.length
      const unread = mockUnifiedMessages.filter(m => !m.read).length
      const qq = mockUnifiedMessages.filter(m => m.type === 'qq').length
      const wechat = mockUnifiedMessages.filter(m => m.type === 'wechat').length
      const email = mockUnifiedMessages.filter(m => m.type === 'email').length

      resolve({
        total,
        unread,
        qq,
        wechat,
        email
      })
    }, 300)
  })
}

// 获取平台状态
export async function getPlatformStatus(): Promise<PlatformStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        qq: {
          connected: false, // 根据实际登录状态
          unreadCount: mockUnifiedMessages.filter(m => m.type === 'qq' && !m.read).length
        },
        wechat: {
          connected: false, // 根据实际登录状态
          unreadCount: mockUnifiedMessages.filter(m => m.type === 'wechat' && !m.read).length
        },
        email: {
          connected: false, // 根据实际登录状态
          unreadCount: mockUnifiedMessages.filter(m => m.type === 'email' && !m.read).length
        }
      })
    }, 300)
  })
}

// 标记消息为已读
export async function markUnifiedMessageAsRead(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = mockUnifiedMessages.find(m => m.id === id)
      if (message) {
        message.read = true
        resolve(true)
      } else {
        resolve(false)
      }
    }, 200)
  })
}

// 删除消息
export async function deleteUnifiedMessage(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUnifiedMessages.findIndex(m => m.id === id)
      if (index !== -1) {
        mockUnifiedMessages.splice(index, 1)
        resolve(true)
      } else {
        resolve(false)
      }
    }, 300)
  })
}

// 根据类型筛选消息
export async function getMessagesByType(type: 'qq' | 'wechat' | 'email' | 'all'): Promise<UnifiedMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMessages = mockUnifiedMessages
      if (type !== 'all') {
        filteredMessages = mockUnifiedMessages.filter(m => m.type === type)
      }
      const sortedMessages = filteredMessages.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      resolve(sortedMessages)
    }, 400)
  })
}

// 搜索消息
export async function searchMessages(query: string): Promise<UnifiedMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredMessages = mockUnifiedMessages.filter(message =>
        message.content.toLowerCase().includes(query.toLowerCase()) ||
        message.from.toLowerCase().includes(query.toLowerCase()) ||
        (message.subject && message.subject.toLowerCase().includes(query.toLowerCase()))
      )
      const sortedMessages = filteredMessages.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      resolve(sortedMessages)
    }, 400)
  })
}

// 格式化时间显示
export function formatUnifiedTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取平台图标
export function getPlatformIcon(type: string): string {
  switch (type) {
    case 'qq': return '🐧'
    case 'wechat': return '💬'
    case 'email': return '📧'
    default: return '💌'
  }
}

// 获取平台颜色
export function getPlatformColor(type: string): string {
  switch (type) {
    case 'qq': return 'bg-blue-500'
    case 'wechat': return 'bg-green-500'
    case 'email': return 'bg-purple-500'
    default: return 'bg-gray-500'
  }
}

// 获取平台文本颜色
export function getPlatformTextColor(type: string): string {
  switch (type) {
    case 'qq': return 'text-blue-600'
    case 'wechat': return 'text-green-600'
    case 'email': return 'text-purple-600'
    default: return 'text-gray-600'
  }
}
