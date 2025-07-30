import emailjs from '@emailjs/browser'

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

// 初始化EmailJS
export const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (publicKey) {
    emailjs.init(publicKey)
  }
}

export const sendEmail = async (data: EmailData) => {
  try {
    // 检查是否配置了EmailJS
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured, skipping email send')
      return { success: true, message: 'Email service not configured' }
    }

    // 初始化EmailJS
    initEmailJS()

    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: process.env.NEXT_PUBLIC_TO_EMAIL || 'your.email@example.com',
        reply_to: data.email,
      }
    )

    return { success: true, result }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 验证表单数据
export const validateContactForm = (data: EmailData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!data.name.trim()) {
    errors.push('姓名不能为空')
  }

  if (!data.email.trim()) {
    errors.push('邮箱不能为空')
  } else if (!validateEmail(data.email)) {
    errors.push('邮箱格式不正确')
  }

  if (!data.subject.trim()) {
    errors.push('主题不能为空')
  }

  if (!data.message.trim()) {
    errors.push('消息内容不能为空')
  }

  if (data.message.length > 1000) {
    errors.push('消息内容不能超过1000字符')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
