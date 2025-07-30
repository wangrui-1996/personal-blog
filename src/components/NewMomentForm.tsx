'use client'

import { useState } from 'react'
import { Camera, MapPin, Smile, Tag, Send, X } from 'lucide-react'
import { addMoment, getMoodIcon, getMoodText, MoodType } from '@/lib/moments'

interface NewMomentFormProps {
  onMomentAdded?: () => void
}

const moods = ['happy', 'sad', 'excited', 'thoughtful', 'relaxed', 'busy'] as const

export default function NewMomentForm({ onMomentAdded }: NewMomentFormProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [selectedMood, setSelectedMood] = useState<MoodType | ''>('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await addMoment({
        content: content.trim(),
        location: location.trim() || undefined,
        mood: selectedMood || undefined,
        tags: tags.length > 0 ? tags : undefined
      })
      
      // 重置表单
      setContent('')
      setLocation('')
      setSelectedMood('')
      setTags([])
      setIsExpanded(false)
      
      onMomentAdded?.()
    } catch (error) {
      console.error('Failed to add moment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      {/* 头部 */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">我</span>
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="分享你的想法..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            rows={isExpanded ? 4 : 2}
          />
        </div>
      </div>

      {/* 扩展选项 */}
      {isExpanded && (
        <div className="space-y-4">
          {/* 位置 */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="添加位置..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 心情选择 */}
          <div className="flex items-center space-x-2">
            <Smile className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(selectedMood === mood ? '' : mood)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedMood === mood
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title={getMoodText(mood)}
                >
                  {getMoodIcon(mood)} {getMoodText(mood)}
                </button>
              ))}
            </div>
          </div>

          {/* 标签 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="添加标签..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                添加
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 图片上传 */}
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-gray-500" />
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              添加图片
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (功能开发中)
            </span>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setIsExpanded(false)
                setContent('')
                setLocation('')
                setSelectedMood('')
                setTags([])
              }}
              className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              取消
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? '发布中...' : '发布'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 简化工具栏 */}
      {!isExpanded && content && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? '发布中...' : '发布'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
