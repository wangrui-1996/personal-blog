// QQ集成相关的类型定义和工具函数

export interface QQUser {
  openid: string
  nickname: string
  avatar: string
  gender: string
  province: string
  city: string
}

export interface QQMessage {
  id: string
  from: string
  to: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'emoji'
  avatar?: string
}

export interface QQContact {
  openid: string
  nickname: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: string
}

// 模拟QQ用户数据
const mockQQUser: QQUser = {
  openid: 'mock_qq_user_123',
  nickname: '博主',
  avatar: '/api/placeholder/50/50',
  gender: '男',
  province: '北京',
  city: '北京'
}

// 模拟QQ联系人
const mockContacts: QQContact[] = [
  {
    openid: 'friend_1',
    nickname: '小明',
    avatar: '/api/placeholder/40/40',
    status: 'online'
  },
  {
    openid: 'friend_2',
    nickname: '小红',
    avatar: '/api/placeholder/40/40',
    status: 'offline',
    lastSeen: '2024-01-20T10:30:00Z'
  },
  {
    openid: 'friend_3',
    nickname: '技术爱好者',
    avatar: '/api/placeholder/40/40',
    status: 'away'
  }
]

// 模拟聊天记录
const mockMessages: { [key: string]: QQMessage[] } = {
  'friend_1': [
    {
      id: '1',
      from: 'friend_1',
      to: 'mock_qq_user_123',
      content: '你好！看到你的博客了，写得很不错！',
      timestamp: '2024-01-20T10:00:00Z',
      type: 'text',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      from: 'mock_qq_user_123',
      to: 'friend_1',
      content: '谢谢！还在不断完善中',
      timestamp: '2024-01-20T10:05:00Z',
      type: 'text',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: '3',
      from: 'friend_1',
      to: 'mock_qq_user_123',
      content: '期待看到更多内容！',
      timestamp: '2024-01-20T10:10:00Z',
      type: 'text',
      avatar: '/api/placeholder/40/40'
    }
  ],
  'friend_2': [
    {
      id: '4',
      from: 'friend_2',
      to: 'mock_qq_user_123',
      content: '最近怎么样？',
      timestamp: '2024-01-19T15:30:00Z',
      type: 'text',
      avatar: '/api/placeholder/40/40'
    }
  ]
}

// QQ登录相关函数
export async function qqLogin(): Promise<{ success: boolean; user?: QQUser; error?: string }> {
  // 模拟登录过程
  return new Promise((resolve) => {
    setTimeout(() => {
      // 在实际应用中，这里会跳转到QQ登录页面
      // 然后处理回调和获取用户信息
      resolve({
        success: true,
        user: mockQQUser
      })
    }, 1000)
  })
}

export async function qqLogout(): Promise<boolean> {
  // 模拟登出过程
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

// 获取QQ联系人列表
export async function getQQContacts(): Promise<QQContact[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockContacts)
    }, 500)
  })
}

// 获取与指定联系人的聊天记录
export async function getQQMessages(contactId: string): Promise<QQMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMessages[contactId] || [])
    }, 300)
  })
}

// 发送QQ消息
export async function sendQQMessage(
  to: string, 
  content: string, 
  type: 'text' | 'image' | 'emoji' = 'text'
): Promise<{ success: boolean; message?: QQMessage; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: QQMessage = {
        id: Date.now().toString(),
        from: mockQQUser.openid,
        to,
        content,
        timestamp: new Date().toISOString(),
        type,
        avatar: mockQQUser.avatar
      }

      // 添加到模拟聊天记录
      if (!mockMessages[to]) {
        mockMessages[to] = []
      }
      mockMessages[to].push(newMessage)

      resolve({
        success: true,
        message: newMessage
      })
    }, 500)
  })
}

// 格式化时间显示
export function formatMessageTime(timestamp: string): string {
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

// 获取在线状态显示
export function getStatusText(status: string): string {
  switch (status) {
    case 'online': return '在线'
    case 'offline': return '离线'
    case 'away': return '离开'
    default: return '未知'
  }
}

// 获取状态颜色
export function getStatusColor(status: string): string {
  switch (status) {
    case 'online': return 'bg-green-500'
    case 'offline': return 'bg-gray-400'
    case 'away': return 'bg-yellow-500'
    default: return 'bg-gray-400'
  }
}

// 实际集成QQ登录的说明
export const QQ_INTEGRATION_GUIDE = `
# QQ登录集成指南

## 1. 申请QQ互联开发者账号
1. 访问 https://connect.qq.com/
2. 注册开发者账号
3. 创建应用并获取 APP ID 和 APP Key

## 2. 配置回调地址
在QQ互联管理中心配置回调地址：
- 开发环境: http://localhost:3000/auth/qq/callback
- 生产环境: https://yourdomain.com/auth/qq/callback

## 3. 安装SDK
npm install qq-connect-sdk

## 4. 环境变量配置
NEXT_PUBLIC_QQ_APP_ID=your_app_id
QQ_APP_KEY=your_app_key

## 5. 实现登录流程
1. 用户点击QQ登录按钮
2. 跳转到QQ授权页面
3. 用户授权后回调到指定地址
4. 获取授权码并换取access_token
5. 使用access_token获取用户信息

## 注意事项
- QQ聊天功能需要额外的API权限
- 需要遵守QQ开放平台的使用规范
- 用户隐私保护是重要考虑因素
`
