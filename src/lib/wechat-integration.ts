// 微信集成相关的类型定义和工具函数

export interface WeChatUser {
  openid: string
  nickname: string
  avatar: string
  sex: number // 1为男性，2为女性，0为未知
  province: string
  city: string
  country: string
  unionid?: string
}

export interface WeChatMessage {
  id: string
  from: string
  to: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'voice' | 'video' | 'emoji'
  avatar?: string
}

export interface WeChatContact {
  openid: string
  nickname: string
  avatar: string
  remark?: string // 备注名
  status: 'online' | 'offline'
  lastSeen?: string
}

// 模拟微信用户数据
const mockWeChatUser: WeChatUser = {
  openid: 'mock_wechat_user_123',
  nickname: '博主',
  avatar: '/api/placeholder/50/50',
  sex: 1,
  province: '北京',
  city: '北京',
  country: '中国'
}

// 模拟微信联系人
const mockWeChatContacts: WeChatContact[] = [
  {
    openid: 'wechat_friend_1',
    nickname: '小张',
    avatar: '/api/placeholder/40/40',
    remark: '同事小张',
    status: 'online'
  },
  {
    openid: 'wechat_friend_2',
    nickname: '老王',
    avatar: '/api/placeholder/40/40',
    status: 'offline',
    lastSeen: '2024-01-20T09:30:00Z'
  },
  {
    openid: 'wechat_friend_3',
    nickname: '设计师小李',
    avatar: '/api/placeholder/40/40',
    remark: 'UI设计师',
    status: 'online'
  }
]

// 模拟微信聊天记录
const mockWeChatMessages: { [key: string]: WeChatMessage[] } = {
  'wechat_friend_1': [
    {
      id: '1',
      from: 'wechat_friend_1',
      to: 'mock_wechat_user_123',
      content: '你的博客做得不错啊！',
      timestamp: '2024-01-20T11:00:00Z',
      type: 'text',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      from: 'mock_wechat_user_123',
      to: 'wechat_friend_1',
      content: '谢谢！还在持续优化中',
      timestamp: '2024-01-20T11:05:00Z',
      type: 'text',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: '3',
      from: 'wechat_friend_1',
      to: 'mock_wechat_user_123',
      content: '有什么新功能吗？',
      timestamp: '2024-01-20T11:10:00Z',
      type: 'text',
      avatar: '/api/placeholder/40/40'
    }
  ],
  'wechat_friend_2': [
    {
      id: '4',
      from: 'wechat_friend_2',
      to: 'mock_wechat_user_123',
      content: '最近在忙什么？',
      timestamp: '2024-01-19T16:30:00Z',
      type: 'text',
      avatar: '/api/placeholder/40/40'
    }
  ]
}

// 微信登录相关函数
export async function wechatLogin(): Promise<{ success: boolean; user?: WeChatUser; error?: string }> {
  // 模拟微信登录过程
  return new Promise((resolve) => {
    setTimeout(() => {
      // 在实际应用中，这里会处理微信OAuth流程
      resolve({
        success: true,
        user: mockWeChatUser
      })
    }, 1500)
  })
}

export async function wechatLogout(): Promise<boolean> {
  // 模拟登出过程
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

// 获取微信联系人列表
export async function getWeChatContacts(): Promise<WeChatContact[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeChatContacts)
    }, 600)
  })
}

// 获取与指定联系人的聊天记录
export async function getWeChatMessages(contactId: string): Promise<WeChatMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeChatMessages[contactId] || [])
    }, 400)
  })
}

// 发送微信消息
export async function sendWeChatMessage(
  to: string, 
  content: string, 
  type: 'text' | 'image' | 'voice' | 'video' | 'emoji' = 'text'
): Promise<{ success: boolean; message?: WeChatMessage; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: WeChatMessage = {
        id: Date.now().toString(),
        from: mockWeChatUser.openid,
        to,
        content,
        timestamp: new Date().toISOString(),
        type,
        avatar: mockWeChatUser.avatar
      }

      // 添加到模拟聊天记录
      if (!mockWeChatMessages[to]) {
        mockWeChatMessages[to] = []
      }
      mockWeChatMessages[to].push(newMessage)

      resolve({
        success: true,
        message: newMessage
      })
    }, 600)
  })
}

// 格式化时间显示
export function formatWeChatTime(timestamp: string): string {
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

// 获取性别显示
export function getGenderText(sex: number): string {
  switch (sex) {
    case 1: return '男'
    case 2: return '女'
    default: return '未知'
  }
}

// 获取在线状态显示
export function getWeChatStatusText(status: string): string {
  switch (status) {
    case 'online': return '在线'
    case 'offline': return '离线'
    default: return '未知'
  }
}

// 获取状态颜色
export function getWeChatStatusColor(status: string): string {
  switch (status) {
    case 'online': return 'bg-green-500'
    case 'offline': return 'bg-gray-400'
    default: return 'bg-gray-400'
  }
}

// 实际集成微信登录的说明
export const WECHAT_INTEGRATION_GUIDE = `
# 微信登录集成指南

## 1. 申请微信开放平台账号
1. 访问 https://open.weixin.qq.com/
2. 注册开发者账号并完成认证
3. 创建网站应用并获取 AppID 和 AppSecret

## 2. 配置授权回调域名
在微信开放平台配置授权回调域名：
- 开发环境: localhost:3000
- 生产环境: yourdomain.com

## 3. 安装SDK
npm install wechat-oauth

## 4. 环境变量配置
NEXT_PUBLIC_WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret

## 5. 实现登录流程
1. 用户点击微信登录按钮
2. 跳转到微信授权页面
3. 用户授权后回调到指定地址
4. 获取授权码并换取access_token
5. 使用access_token获取用户信息

## 6. 微信聊天功能说明
- 微信不提供直接的网页聊天API
- 可以通过微信公众号或小程序实现消息交互
- 企业微信提供更多的API接口

## 注意事项
- 需要HTTPS域名（生产环境）
- 遵守微信开放平台使用规范
- 用户隐私保护是重要考虑因素
- 定期更新access_token
`
