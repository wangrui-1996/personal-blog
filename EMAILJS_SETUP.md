# EmailJS 设置指南

本指南将帮助你配置EmailJS服务，使博客的联系表单能够发送邮件。

## 1. 注册EmailJS账户

1. 访问 [EmailJS官网](https://www.emailjs.com/)
2. 点击 "Sign Up" 注册账户
3. 验证邮箱地址

## 2. 创建邮件服务

1. 登录EmailJS控制台
2. 点击 "Add New Service"
3. 选择邮件服务提供商（推荐Gmail）
4. 按照指引连接你的邮箱账户
5. 记录下 **Service ID**

## 3. 创建邮件模板

1. 在控制台点击 "Email Templates"
2. 点击 "Create New Template"
3. 设计邮件模板，使用以下变量：
   - `{{from_name}}` - 发送者姓名
   - `{{from_email}}` - 发送者邮箱
   - `{{subject}}` - 邮件主题
   - `{{message}}` - 邮件内容
   - `{{to_email}}` - 接收者邮箱

### 推荐的邮件模板

**主题：** 来自{{from_name}}的新消息：{{subject}}

**内容：**
```
你好，

你收到了一条来自个人博客的新消息：

发送者：{{from_name}}
邮箱：{{from_email}}
主题：{{subject}}

消息内容：
{{message}}

---
此邮件来自你的个人博客联系表单
```

4. 保存模板并记录下 **Template ID**

## 4. 获取Public Key

1. 在控制台点击 "Account"
2. 在 "API Keys" 部分找到 **Public Key**
3. 如果没有，点击 "Generate New Key"

## 5. 配置环境变量

在项目根目录创建 `.env.local` 文件（如果还没有），添加以下配置：

```env
# EmailJS配置
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_TO_EMAIL=your_email@example.com

# 其他配置
NEXT_PUBLIC_BLOG_TITLE=我的个人博客
NEXT_PUBLIC_BLOG_DESCRIPTION=记录生活和学习的地方
NEXT_PUBLIC_AUTHOR_NAME=你的名字
NEXT_PUBLIC_AUTHOR_EMAIL=your_email@example.com

# QQ和微信联系方式
NEXT_PUBLIC_QQ_NUMBER=your_qq_number
NEXT_PUBLIC_WECHAT_ID=your_wechat_id
```

## 6. 测试邮件功能

1. 启动开发服务器：`npm run dev`
2. 访问联系页面：`http://localhost:3000/contact`
3. 填写并提交联系表单
4. 检查你的邮箱是否收到邮件

## 7. 故障排除

### 常见问题

**问题1：邮件发送失败**
- 检查Service ID、Template ID和Public Key是否正确
- 确保邮件服务已正确连接
- 检查浏览器控制台的错误信息

**问题2：收不到邮件**
- 检查垃圾邮件文件夹
- 确认TO_EMAIL环境变量设置正确
- 验证邮件模板中的变量名称

**问题3：CORS错误**
- 确保在EmailJS控制台的"Settings"中添加了你的域名
- 本地开发时添加 `localhost:3000`

### 调试技巧

1. 在浏览器开发者工具的Network标签中查看请求
2. 检查EmailJS控制台的"Logs"部分
3. 使用console.log输出调试信息

## 8. 生产环境配置

### Vercel部署

1. 在Vercel项目设置中添加环境变量
2. 在EmailJS控制台的"Settings"中添加你的生产域名
3. 重新部署项目

### 其他平台

确保在部署平台的环境变量设置中添加所有必要的EmailJS配置。

## 9. 安全注意事项

1. **不要**在客户端代码中暴露Private Key
2. 只使用Public Key进行客户端集成
3. 在EmailJS控制台中限制允许的域名
4. 定期检查邮件发送日志

## 10. 免费额度

EmailJS免费计划包括：
- 每月200封邮件
- 2个邮件服务
- 基础模板功能

如需更多功能，可考虑升级到付费计划。

## 支持

如果遇到问题，可以：
1. 查看[EmailJS官方文档](https://www.emailjs.com/docs/)
2. 在项目的GitHub Issues中提问
3. 通过博客联系表单联系我

---

配置完成后，你的博客就具备了完整的邮件发送功能！
