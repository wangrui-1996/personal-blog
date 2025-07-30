'use client'

import { useState } from 'react'
import { MessageCircle, Phone, Mail, Copy, Check, QrCode, ExternalLink } from 'lucide-react'

interface ContactMethodsProps {
  showTitle?: boolean
  layout?: 'horizontal' | 'vertical'
}

export default function ContactMethods({ showTitle = true, layout = 'horizontal' }: ContactMethodsProps) {
  const [copiedQQ, setCopiedQQ] = useState(false)
  const [copiedWechat, setCopiedWechat] = useState(false)
  const [showWechatQR, setShowWechatQR] = useState(false)

  const qqNumber = process.env.NEXT_PUBLIC_QQ_NUMBER || '123456789'
  const wechatId = process.env.NEXT_PUBLIC_WECHAT_ID || 'your_wechat_id'
  const email = process.env.NEXT_PUBLIC_AUTHOR_EMAIL || 'your.email@example.com'

  const copyToClipboard = async (text: string, type: 'qq' | 'wechat') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'qq') {
        setCopiedQQ(true)
        setTimeout(() => setCopiedQQ(false), 2000)
      } else {
        setCopiedWechat(true)
        setTimeout(() => setCopiedWechat(false), 2000)
      }
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const openQQChat = () => {
    // QQ临时会话链接
    window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${qqNumber}`, '_blank')
  }

  const gridClass = layout === 'horizontal' 
    ? 'grid md:grid-cols-3 gap-6' 
    : 'space-y-6'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      {showTitle && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">联系方式</h2>
      )}
      
      <div className={gridClass}>
        {/* WeChat */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">微信</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">扫码或搜索添加</p>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">微信号：{wechatId}</p>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => copyToClipboard(wechatId, 'wechat')}
                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm px-2 py-1 rounded border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                {copiedWechat ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedWechat ? '已复制' : '复制'}
              </button>
              <button
                onClick={() => setShowWechatQR(!showWechatQR)}
                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm px-2 py-1 rounded border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                <QrCode className="w-3 h-3 mr-1" />
                二维码
              </button>
            </div>
            
            {showWechatQR && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-xs text-center">
                    微信二维码<br/>
                    (需要上传实际二维码)
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  使用微信扫描二维码添加好友
                </p>
              </div>
            )}
          </div>
        </div>

        {/* QQ */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">QQ</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">点击添加QQ好友</p>
          
          <div className="space-y-2">
            <p className="text-lg font-mono text-gray-900 dark:text-white">{qqNumber}</p>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => copyToClipboard(qqNumber, 'qq')}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm px-2 py-1 rounded border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                {copiedQQ ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedQQ ? '已复制' : '复制'}
              </button>
              <button
                onClick={openQQChat}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm px-2 py-1 rounded border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                添加好友
              </button>
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-600 dark:text-blue-400">
                💡 提示：点击"添加好友"会尝试打开QQ客户端
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">邮箱</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">发送邮件联系我</p>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 break-all">{email}</p>
            <div className="flex justify-center space-x-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center text-purple-600 hover:text-purple-700 text-sm px-2 py-1 rounded border border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <Mail className="w-3 h-3 mr-1" />
                发送邮件
              </a>
            </div>
            
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-xs text-purple-600 dark:text-purple-400">
                📧 也可以使用联系表单发送消息
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 额外说明 */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">联系说明</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• 微信和QQ通常能更快收到回复</li>
          <li>• 邮件适合发送较长的内容或文件</li>
          <li>• 工作时间：周一至周五 9:00-18:00</li>
          <li>• 通常24小时内回复消息</li>
        </ul>
      </div>
    </div>
  )
}
