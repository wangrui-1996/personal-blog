'use client'

import { useState, useEffect } from 'react'
import { X, Save, MapPin, Tag, Smile, Cloud } from 'lucide-react'
import { Moment, MoodType, WeatherCondition } from '@/lib/moments'

interface EditMomentFormProps {
  moment: Moment
  onSave: (updatedMoment: Moment) => void
  onCancel: () => void
}

export default function EditMomentForm({ moment, onSave, onCancel }: EditMomentFormProps) {
  const [content, setContent] = useState(moment.content)
  const [location, setLocation] = useState(moment.location || '')
  const [tags, setTags] = useState(moment.tags?.join(', ') || '')
  const [mood, setMood] = useState<MoodType | ''>(moment.mood || '')
  const [weather, setWeather] = useState({
    condition: moment.weather?.condition || '' as WeatherCondition | '',
    temperature: moment.weather?.temperature || 20,
    icon: moment.weather?.icon || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const moodOptions: { value: MoodType; label: string; icon: string }[] = [
    { value: 'happy', label: '开心', icon: '😊' },
    { value: 'excited', label: '兴奋', icon: '🤩' },
    { value: 'calm', label: '平静', icon: '😌' },
    { value: 'thoughtful', label: '深思', icon: '🤔' },
    { value: 'grateful', label: '感恩', icon: '🙏' },
    { value: 'motivated', label: '有动力', icon: '💪' },
    { value: 'creative', label: '有创意', icon: '🎨' },
    { value: 'tired', label: '疲惫', icon: '😴' }
  ]

  const weatherOptions: { value: WeatherCondition; label: string; icon: string }[] = [
    { value: 'sunny', label: '晴天', icon: '☀️' },
    { value: 'cloudy', label: '多云', icon: '☁️' },
    { value: 'rainy', label: '雨天', icon: '🌧️' },
    { value: 'snowy', label: '雪天', icon: '❄️' },
    { value: 'windy', label: '大风', icon: '💨' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const updatedMoment: Moment = {
        ...moment,
        content: content.trim(),
        location: location.trim() || undefined,
        tags: tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : undefined,
        mood: mood || undefined,
        weather: weather.condition ? {
          condition: weather.condition,
          temperature: weather.temperature,
          icon: weatherOptions.find(w => w.value === weather.condition)?.icon || ''
        } : undefined,
        updated_at: new Date().toISOString()
      }

      onSave(updatedMoment)
    } catch (error) {
      console.error('Failed to update moment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          编辑动态
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 内容输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            动态内容
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            placeholder="分享你的想法..."
            required
          />
        </div>

        {/* 位置 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            位置 (可选)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="你在哪里？"
          />
        </div>

        {/* 标签 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            标签 (可选，用逗号分隔)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="生活, 工作, 学习"
          />
        </div>

        {/* 心情和天气 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 心情选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Smile className="w-4 h-4 inline mr-1" />
              心情 (可选)
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value as MoodType | '')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">选择心情</option>
              {moodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 天气选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Cloud className="w-4 h-4 inline mr-1" />
              天气 (可选)
            </label>
            <div className="space-y-2">
              <select
                value={weather.condition}
                onChange={(e) => setWeather({ ...weather, condition: e.target.value as WeatherCondition | '' })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">选择天气</option>
                {weatherOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
              {weather.condition && (
                <input
                  type="number"
                  value={weather.temperature}
                  onChange={(e) => setWeather({ ...weather, temperature: parseInt(e.target.value) || 20 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="温度 (°C)"
                  min="-50"
                  max="50"
                />
              )}
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            取消
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                保存中...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Save className="w-4 h-4 mr-2" />
                保存更改
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
