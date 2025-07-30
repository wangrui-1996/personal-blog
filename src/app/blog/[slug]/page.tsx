'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft, User } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { BlogPost, getPostById } from '@/lib/blog-data'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPost()
  }, [slug, loadPost])

  const loadPost = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const postData = await getPostById(slug)
      if (postData) {
        setPost(postData)
      } else {
        setError('文章不存在')
      }
    } catch (error) {
      console.error('Failed to load post:', error)
      setError('加载文章失败')
    } finally {
      setLoading(false)
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderContent = (content: string) => {
    // 简单的 Markdown 渲染（实际项目中应该使用专业的 Markdown 解析器）
    return content
      .split('\n')
      .map((line, index) => {
        // 标题
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{line.slice(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{line.slice(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{line.slice(4)}</h3>
        }
        
        // 代码块
        if (line.startsWith('```')) {
          return <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 font-mono text-sm overflow-x-auto"></div>
        }
        
        // 普通段落
        if (line.trim() === '') {
          return <br key={index} />
        }
        
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {line}
          </p>
        )
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">加载中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || '文章不存在'}
            </h1>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回博客列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客列表
          </Link>
        </div>

        {/* 文章头部 */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {/* 文章标题 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-8 space-x-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} 分钟阅读
              </div>
            </div>

            {/* 文章标签 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 文章摘要 */}
            <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
              {post.excerpt}
            </div>

            {/* 文章内容 */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {renderContent(post.content)}
            </div>
          </div>
        </article>

        {/* 文章底部 */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客列表
          </Link>
        </div>
      </main>
    </div>
  )
}
