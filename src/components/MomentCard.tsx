'use client'

import { useState } from 'react'
import { Heart, MessageCircle, MapPin, Clock, Tag, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { Moment, formatTime, getMoodIcon, getMoodText, likeMoment, addComment } from '@/lib/moments'
import { useAuth } from '@/lib/auth'

interface MomentCardProps {
  moment: Moment
  onLike?: (id: string) => void
  onComment?: (id: string, comment: string) => void
  onEdit?: (moment: Moment) => void
  onDelete?: (id: string) => void
}

export default function MomentCard({ moment, onLike, onComment, onEdit, onDelete }: MomentCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { isAdmin, mounted } = useAuth()

  const handleLike = async () => {
    if (!isLiked) {
      setIsLiked(true)
      await likeMoment(moment.id)
      onLike?.(moment.id)
    }
  }

  const handleComment = async () => {
    if (!newComment.trim()) return
    
    setIsSubmittingComment(true)
    try {
      await addComment(moment.id, {
        author: '访客',
        content: newComment.trim()
      })
      setNewComment('')
      onComment?.(moment.id, newComment.trim())
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transition-all hover:shadow-xl">
      {/* 头部信息 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">我</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">博主</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{formatTime(moment.created_at)}</span>
              {moment.mood && (
                <>
                  <span>•</span>
                  <span>{getMoodIcon(moment.mood)} {getMoodText(moment.mood)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {moment.weather && (
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{moment.weather.icon}</span>
              <span>{moment.weather.temperature}°C</span>
              <span>{moment.weather.condition}</span>
            </div>
          )}

          {/* 管理菜单 - 仅博主可见 */}
          {mounted && isAdmin && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {showMenu && (
                <>
                  {/* 背景遮罩 */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  {/* 菜单 */}
                  <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                    <button
                      onClick={() => {
                        onEdit?.(moment)
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('确定要删除这条动态吗？')) {
                          onDelete?.(moment.id)
                        }
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 位置信息 */}
      {moment.location && (
        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{moment.location}</span>
        </div>
      )}

      {/* 内容 */}
      <div className="mb-4">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
          {moment.content}
        </p>
      </div>

      {/* 图片 */}
      {moment.images && moment.images.length > 0 && (
        <div className={`grid gap-2 mb-4 ${
          moment.images.length === 1 ? 'grid-cols-1' :
          moment.images.length === 2 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {moment.images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-sm">图片 {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 标签 */}
      {moment.tags && moment.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {moment.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 互动按钮 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked 
                ? 'text-red-500' 
                : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{(moment.likes || 0) + (isLiked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{moment.comments?.length || 0}</span>
          </button>
        </div>
      </div>

      {/* 评论区域 */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* 现有评论 */}
          {moment.comments && moment.comments.length > 0 && (
            <div className="space-y-3 mb-4">
              {moment.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {comment.author[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {comment.author}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatTime(comment.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 添加评论 */}
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">你</span>
            </div>
            <div className="flex-1">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下你的想法..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  disabled={!newComment.trim() || isSubmittingComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                >
                  {isSubmittingComment ? '发送中...' : '发送'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
