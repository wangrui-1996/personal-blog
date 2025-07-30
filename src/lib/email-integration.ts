// 邮箱集成相关的类型定义和工具函数

export interface EmailAccount {
  id: string
  email: string
  name: string
  provider: 'gmail' | 'outlook' | 'qq' | '163' | 'other'
  avatar?: string
  isDefault: boolean
}

export interface EmailMessage {
  id: string
  from: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  content: string
  timestamp: string
  read: boolean
  starred: boolean
  folder: 'inbox' | 'sent' | 'draft' | 'trash' | 'spam'
  attachments?: EmailAttachment[]
  labels?: string[]
}

export interface EmailAttachment {
  id: string
  name: string
  size: number
  type: string
  url?: string
}

export interface EmailFolder {
  id: string
  name: string
  count: number
  unreadCount: number
}

// 模拟邮箱账户
const mockEmailAccount: EmailAccount = {
  id: 'account_1',
  email: 'your.email@example.com',
  name: '博主',
  provider: 'gmail',
  avatar: '/api/placeholder/50/50',
  isDefault: true
}

// 模拟邮件文件夹
const mockFolders: EmailFolder[] = [
  { id: 'inbox', name: '收件箱', count: 15, unreadCount: 3 },
  { id: 'sent', name: '已发送', count: 8, unreadCount: 0 },
  { id: 'draft', name: '草稿箱', count: 2, unreadCount: 0 },
  { id: 'trash', name: '垃圾箱', count: 5, unreadCount: 0 },
  { id: 'spam', name: '垃圾邮件', count: 1, unreadCount: 0 }
]

// 模拟邮件数据
const mockEmails: EmailMessage[] = [
  {
    id: 'email_1',
    from: 'friend@example.com',
    to: ['your.email@example.com'],
    subject: '关于你的博客项目',
    content: `你好！

我看到了你的个人博客，做得非常棒！特别是那个日常动态的功能，很有创意。

我想问一下：
1. 你是用什么技术栈开发的？
2. 有没有考虑开源？

期待你的回复！

最好的祝愿，
朋友`,
    timestamp: '2024-01-20T14:30:00Z',
    read: false,
    starred: false,
    folder: 'inbox'
  },
  {
    id: 'email_2',
    from: 'newsletter@techblog.com',
    to: ['your.email@example.com'],
    subject: '本周技术资讯汇总',
    content: `本周技术要闻：

1. React 19 发布候选版本
2. Next.js 15 新特性预览
3. TypeScript 5.3 正式发布

点击查看详情...`,
    timestamp: '2024-01-20T09:15:00Z',
    read: true,
    starred: true,
    folder: 'inbox',
    labels: ['技术', '资讯']
  },
  {
    id: 'email_3',
    from: 'your.email@example.com',
    to: ['client@company.com'],
    subject: '项目进度更新',
    content: `亲爱的客户，

项目目前进展顺利，已完成：
- 前端界面设计
- 核心功能开发
- 响应式适配

预计下周可以交付测试版本。

谢谢！`,
    timestamp: '2024-01-19T16:45:00Z',
    read: true,
    starred: false,
    folder: 'sent'
  },
  {
    id: 'email_4',
    from: 'support@service.com',
    to: ['your.email@example.com'],
    subject: '账户安全提醒',
    content: `我们检测到您的账户有异常登录活动。

如果这不是您本人的操作，请立即：
1. 修改密码
2. 启用两步验证
3. 联系客服

保护账户安全是我们共同的责任。`,
    timestamp: '2024-01-19T11:20:00Z',
    read: false,
    starred: false,
    folder: 'inbox'
  },
  {
    id: 'email_5',
    from: 'your.email@example.com',
    to: ['team@company.com'],
    subject: '会议纪要 - 产品规划讨论',
    content: `会议纪要

时间：2024年1月18日
参与者：产品团队

讨论要点：
1. Q1产品路线图
2. 用户反馈分析
3. 技术债务处理

下次会议：1月25日`,
    timestamp: '2024-01-18T15:30:00Z',
    read: true,
    starred: false,
    folder: 'draft'
  }
]

// 邮箱登录相关函数
export async function emailLogin(email: string, password: string): Promise<{ success: boolean; account?: EmailAccount; error?: string }> {
  // 模拟邮箱登录过程
  return new Promise((resolve) => {
    setTimeout(() => {
      // 在实际应用中，这里会验证邮箱和密码
      if (email && password) {
        resolve({
          success: true,
          account: {
            ...mockEmailAccount,
            email: email
          }
        })
      } else {
        resolve({
          success: false,
          error: '邮箱或密码不能为空'
        })
      }
    }, 1000)
  })
}

export async function emailLogout(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

// 获取邮件文件夹
export async function getEmailFolders(): Promise<EmailFolder[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFolders)
    }, 300)
  })
}

// 获取邮件列表
export async function getEmails(folder: string = 'inbox'): Promise<EmailMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredEmails = mockEmails
        .filter(email => email.folder === folder)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      resolve(filteredEmails)
    }, 500)
  })
}

// 获取单个邮件
export async function getEmailById(id: string): Promise<EmailMessage | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = mockEmails.find(e => e.id === id)
      resolve(email || null)
    }, 300)
  })
}

// 发送邮件
export async function sendEmail(emailData: {
  to: string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  content: string
}): Promise<{ success: boolean; message?: EmailMessage; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmail: EmailMessage = {
        id: `email_${Date.now()}`,
        from: mockEmailAccount.email,
        to: emailData.to,
        cc: emailData.cc,
        bcc: emailData.bcc,
        subject: emailData.subject,
        content: emailData.content,
        timestamp: new Date().toISOString(),
        read: true,
        starred: false,
        folder: 'sent'
      }

      // 添加到模拟邮件列表
      mockEmails.unshift(newEmail)

      resolve({
        success: true,
        message: newEmail
      })
    }, 800)
  })
}

// 标记邮件为已读
export async function markEmailAsRead(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = mockEmails.find(e => e.id === id)
      if (email) {
        email.read = true
        resolve(true)
      } else {
        resolve(false)
      }
    }, 200)
  })
}

// 标记邮件星标
export async function toggleEmailStar(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = mockEmails.find(e => e.id === id)
      if (email) {
        email.starred = !email.starred
        resolve(true)
      } else {
        resolve(false)
      }
    }, 200)
  })
}

// 删除邮件
export async function deleteEmail(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = mockEmails.find(e => e.id === id)
      if (email) {
        email.folder = 'trash'
        resolve(true)
      } else {
        resolve(false)
      }
    }, 300)
  })
}

// 格式化时间显示
export function formatEmailTime(timestamp: string): string {
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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取邮件提供商图标
export function getProviderIcon(provider: string): string {
  switch (provider) {
    case 'gmail': return '📧'
    case 'outlook': return '📨'
    case 'qq': return '📮'
    case '163': return '📬'
    default: return '✉️'
  }
}

// 实际集成邮箱的说明
export const EMAIL_INTEGRATION_GUIDE = `
# 邮箱集成指南

## 1. 选择邮箱服务提供商
- Gmail: 使用Gmail API
- Outlook: 使用Microsoft Graph API
- 其他: 使用IMAP/SMTP协议

## 2. 获取API凭证
### Gmail API
1. 访问 Google Cloud Console
2. 创建项目并启用Gmail API
3. 创建OAuth 2.0凭证

### Microsoft Graph API
1. 访问 Azure Portal
2. 注册应用程序
3. 配置API权限

## 3. 环境变量配置
NEXT_PUBLIC_GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_OUTLOOK_CLIENT_ID=your_client_id
OUTLOOK_CLIENT_SECRET=your_client_secret

## 4. 实现OAuth流程
1. 用户点击邮箱登录
2. 跳转到OAuth授权页面
3. 获取授权码
4. 换取访问令牌
5. 使用令牌访问邮箱API

## 5. 安全考虑
- 使用HTTPS
- 安全存储访问令牌
- 定期刷新令牌
- 遵守数据保护法规

## 注意事项
- 邮箱API有使用限制
- 需要用户明确授权
- 考虑离线访问需求
- 处理API错误和重试
`
