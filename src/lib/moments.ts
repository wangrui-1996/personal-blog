export interface Moment {
  id: string
  content: string
  images?: string[]
  location?: string
  mood?: 'happy' | 'sad' | 'excited' | 'thoughtful' | 'relaxed' | 'busy'
  tags?: string[]
  created_at: string
  likes?: number
  comments?: Comment[]
  weather?: {
    condition: string
    temperature: number
    icon: string
  }
}

export interface Comment {
  id: string
  author: string
  content: string
  created_at: string
  avatar?: string
}

// 本地存储键名
const MOMENTS_STORAGE_KEY = 'personal-blog-moments'

// 默认模拟数据
const defaultMoments: Moment[] = [
  {
    id: '1',
    content: '今天天气真好！在公园里散步，看到了很多美丽的花朵。春天真的来了，心情也变得格外愉悦。生活中的小美好总是让人感到幸福。',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    location: '中央公园',
    mood: 'happy',
    tags: ['散步', '春天', '花朵'],
    created_at: '2024-01-20T10:30:00Z',
    likes: 12,
    weather: {
      condition: '晴朗',
      temperature: 22,
      icon: '☀️'
    },
    comments: [
      {
        id: '1',
        author: '小明',
        content: '照片拍得真美！',
        created_at: '2024-01-20T11:00:00Z'
      },
      {
        id: '2',
        author: '小红',
        content: '我也想去公园走走',
        created_at: '2024-01-20T11:30:00Z'
      }
    ]
  },
  {
    id: '2',
    content: '刚刚完成了一个新的项目，使用Next.js和Tailwind CSS搭建了这个个人博客。虽然过程中遇到了一些挑战，但最终的效果让我很满意。技术的魅力就在于能够将想法变成现实。',
    location: '家里',
    mood: 'excited',
    tags: ['编程', 'Next.js', '项目'],
    created_at: '2024-01-19T20:15:00Z',
    likes: 8,
    comments: [
      {
        id: '3',
        author: '技术爱好者',
        content: '厉害！可以分享一下技术栈吗？',
        created_at: '2024-01-19T21:00:00Z'
      }
    ]
  },
  {
    id: '3',
    content: '今天读了一本很有意思的书《人类简史》，作者对人类文明发展的见解很独特。特别是关于认知革命的部分，让我重新思考了很多问题。读书真的能开阔视野。',
    mood: 'thoughtful',
    tags: ['读书', '思考', '历史'],
    created_at: '2024-01-18T19:45:00Z',
    likes: 15,
    comments: [
      {
        id: '4',
        author: '书虫',
        content: '这本书我也在读，确实很棒！',
        created_at: '2024-01-18T20:00:00Z'
      },
      {
        id: '5',
        author: '哲学家',
        content: '推荐你也读读《未来简史》',
        created_at: '2024-01-18T20:30:00Z'
      }
    ]
  },
  {
    id: '4',
    content: '周末和朋友们一起做饭，尝试了新的菜谱。虽然第一次做有点手忙脚乱，但最后的味道还不错。和朋友一起分享美食的时光总是特别温馨。',
    images: ['/api/placeholder/400/300'],
    location: '朋友家',
    mood: 'happy',
    tags: ['美食', '朋友', '周末'],
    created_at: '2024-01-17T18:20:00Z',
    likes: 20,
    comments: [
      {
        id: '6',
        author: '美食家',
        content: '看起来很香！能分享食谱吗？',
        created_at: '2024-01-17T19:00:00Z'
      }
    ]
  },
  {
    id: '5',
    content: '最近工作比较忙，但还是要记得照顾好自己。今天早起跑了步，感觉整个人都精神了很多。运动真的是最好的解压方式。',
    mood: 'busy',
    tags: ['运动', '跑步', '健康'],
    created_at: '2024-01-16T07:30:00Z',
    likes: 10,
    weather: {
      condition: '多云',
      temperature: 18,
      icon: '⛅'
    }
  }
]

// 本地存储工具函数
function loadMomentsFromStorage(): Moment[] {
  if (typeof window === 'undefined') {
    return defaultMoments
  }

  try {
    const stored = localStorage.getItem(MOMENTS_STORAGE_KEY)
    if (stored) {
      const parsedMoments = JSON.parse(stored)
      // 如果本地存储为空或无效，使用默认数据
      return Array.isArray(parsedMoments) && parsedMoments.length > 0 ? parsedMoments : defaultMoments
    }
  } catch (error) {
    console.error('Failed to load moments from localStorage:', error)
  }

  return defaultMoments
}

function saveMomentsToStorage(moments: Moment[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(MOMENTS_STORAGE_KEY, JSON.stringify(moments))
  } catch (error) {
    console.error('Failed to save moments to localStorage:', error)
  }
}

// 动态加载的moments数组
export let mockMoments: Moment[] = loadMomentsFromStorage()

// 获取所有动态
export async function getAllMoments(): Promise<Moment[]> {
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockMoments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

// 根据ID获取动态
export async function getMomentById(id: string): Promise<Moment | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockMoments.find(moment => moment.id === id) || null
}

// 生成唯一ID
function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 添加新动态
export async function addMoment(moment: Omit<Moment, 'id' | 'created_at' | 'likes' | 'comments'>): Promise<Moment> {
  const newMoment: Moment = {
    ...moment,
    id: generateUniqueId(),
    created_at: new Date().toISOString(),
    likes: 0,
    comments: []
  }
  mockMoments.unshift(newMoment)
  saveMomentsToStorage(mockMoments)
  return newMoment
}

// 点赞动态
export async function likeMoment(id: string): Promise<boolean> {
  const moment = mockMoments.find(m => m.id === id)
  if (moment) {
    moment.likes = (moment.likes || 0) + 1
    saveMomentsToStorage(mockMoments)
    return true
  }
  return false
}

// 添加评论
export async function addComment(momentId: string, comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment | null> {
  const moment = mockMoments.find(m => m.id === momentId)
  if (moment) {
    const newComment: Comment = {
      ...comment,
      id: generateUniqueId(),
      created_at: new Date().toISOString()
    }
    if (!moment.comments) {
      moment.comments = []
    }
    moment.comments.push(newComment)
    saveMomentsToStorage(mockMoments)
    return newComment
  }
  return null
}

// 格式化时间
export function formatTime(dateString: string): string {
  const date = new Date(dateString)
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
    month: 'long',
    day: 'numeric'
  })
}

// 获取心情图标
export function getMoodIcon(mood?: string): string {
  switch (mood) {
    case 'happy': return '😊'
    case 'sad': return '😢'
    case 'excited': return '🎉'
    case 'thoughtful': return '🤔'
    case 'relaxed': return '😌'
    case 'busy': return '😤'
    default: return '😐'
  }
}

// 获取心情文本
export function getMoodText(mood?: string): string {
  switch (mood) {
    case 'happy': return '开心'
    case 'sad': return '难过'
    case 'excited': return '兴奋'
    case 'thoughtful': return '思考'
    case 'relaxed': return '放松'
    case 'busy': return '忙碌'
    default: return '平静'
  }
}

// 重置数据到默认状态（开发和测试用）
export function resetMomentsData(): void {
  mockMoments.length = 0
  mockMoments.push(...defaultMoments)
  saveMomentsToStorage(mockMoments)
}

// 清除所有本地存储的数据
export function clearAllMomentsData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(MOMENTS_STORAGE_KEY)
  }
  mockMoments.length = 0
  mockMoments.push(...defaultMoments)
}
