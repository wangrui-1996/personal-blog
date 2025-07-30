import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 只有在配置了Supabase时才创建客户端
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

// 博客文章相关函数
export async function getAllPostsFromDB() {
  if (!supabase) {
    console.warn('Supabase not configured')
    return []
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlugFromDB(slug: string) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

// 联系消息相关函数
export async function saveContactMessage(message: {
  name: string
  email: string
  subject: string
  message: string
}) {
  if (!supabase) {
    console.warn('Supabase not configured, message not saved to database')
    return { success: true, data: null }
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()

  if (error) {
    console.error('Error saving contact message:', error)
    return { success: false, error }
  }

  return { success: true, data }
}

// 评论相关函数
export async function getCommentsByPostId(postId: string) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return []
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('approved', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return data || []
}

export async function addComment(comment: {
  post_id: string
  author_name: string
  author_email: string
  content: string
  parent_id?: string
}) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return { success: false, error: 'Database not configured' }
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([{ ...comment, approved: false }])
    .select()

  if (error) {
    console.error('Error adding comment:', error)
    return { success: false, error }
  }

  return { success: true, data }
}
