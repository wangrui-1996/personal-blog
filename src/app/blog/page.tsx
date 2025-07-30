'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllPosts, BlogPost } from '@/lib/blog-data'
import Navigation from '@/components/Navigation'



export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const posts = await getAllPosts()
      setBlogPosts(posts)
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // 计算分页
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Navigation />

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">博客文章</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">分享生活与技术的点点滴滴</p>
        </div>
      </div>

      {/* Blog Posts */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">加载中...</span>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              暂无博客文章
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              敬请期待更多精彩内容！
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {currentPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400">
                <Link href={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('zh-CN')}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} 分钟
                  </span>
                </div>
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  阅读全文 →
                </Link>
              </div>
            </article>
          ))}
        </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === 1
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    上一页
                  </button>

                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          currentPage === page
                            ? 'text-white bg-blue-600 border border-blue-600 hover:bg-blue-700'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    下一页
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </nav>
              </div>
            )}

            {/* 分页信息 */}
            {totalPages > 1 && (
              <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                第 {currentPage} 页，共 {totalPages} 页 | 总共 {blogPosts.length} 篇文章
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
