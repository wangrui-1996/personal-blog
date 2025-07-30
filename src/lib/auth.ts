// 身份验证和权限管理
import { useState, useEffect } from 'react'

export interface User {
  id: string
  username: string
  role: 'visitor' | 'admin'
  avatar?: string
}

// 本地存储键名
const AUTH_STORAGE_KEY = 'personal-blog-auth'
const AUTH_CHANGE_EVENT = 'auth-change'
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // 在实际项目中应该使用更安全的认证方式
}

// 获取当前用户
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null
  }
  
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to get current user:', error)
  }
  
  return null
}

// 设置当前用户
export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    // 触发自定义事件通知所有监听器
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, {
      detail: { user }
    }))
  } catch (error) {
    console.error('Failed to set current user:', error)
  }
}

// 博主登录
export async function loginAsAdmin(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const user: User = {
          id: 'admin-001',
          username: 'admin',
          role: 'admin',
          avatar: '/api/placeholder/40/40'
        }
        setCurrentUser(user)
        resolve({ success: true, user })
      } else {
        resolve({ success: false, error: '用户名或密码错误' })
      }
    }, 500)
  })
}

// 退出登录
export function logout(): void {
  setCurrentUser(null)
}

// 检查是否为博主
export function isAdmin(user?: User | null): boolean {
  const currentUser = user || getCurrentUser()
  return currentUser?.role === 'admin'
}

// 检查是否为访客
export function isVisitor(user?: User | null): boolean {
  const currentUser = user || getCurrentUser()
  return !currentUser || currentUser.role === 'visitor'
}

// 权限检查钩子
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // 监听认证状态变化
    const handleAuthChange = (e: CustomEvent) => {
      console.log('Auth change event received:', e.detail.user)
      setUser(e.detail.user)
    }

    // 监听 localStorage 变化，确保多标签页同步
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) {
        const newUser = getCurrentUser()
        setUser(newUser)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange as EventListener)
      window.addEventListener('storage', handleStorageChange)
      return () => {
        window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange as EventListener)
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    const result = await loginAsAdmin(username, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }

  const logoutUser = () => {
    console.log('Logging out user...')
    logout() // 这会调用 setCurrentUser(null)，自动触发事件
    console.log('User logged out, current user:', getCurrentUser())
  }

  return {
    user,
    loading,
    mounted,
    isAdmin: mounted ? user?.role === 'admin' : false,
    isVisitor: mounted ? !user || user.role === 'visitor' : true,
    login,
    logout: logoutUser
  }
}


