-- 创建博客文章表
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id TEXT NOT NULL DEFAULT 'admin',
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  read_time INTEGER
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE
);

-- 创建联系消息表
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- 启用行级安全性
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取已发布的文章
CREATE POLICY "Allow public read access to published posts" ON posts
  FOR SELECT USING (published = true);

-- 创建策略：允许所有人读取已批准的评论
CREATE POLICY "Allow public read access to approved comments" ON comments
  FOR SELECT USING (approved = true);

-- 创建策略：允许所有人插入评论（需要审核）
CREATE POLICY "Allow public insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- 创建策略：允许所有人插入联系消息
CREATE POLICY "Allow public insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 插入示例数据
INSERT INTO posts (title, content, excerpt, slug, published, tags, author_id) VALUES
(
  '欢迎来到我的个人博客',
  '<h1>欢迎来到我的个人博客！</h1>
<p>这是我的第一篇博客文章，很高兴能在这里与大家分享我的想法和经历。</p>
<h2>为什么要写博客？</h2>
<p>写博客对我来说有几个重要的意义：</p>
<ol>
<li><strong>记录生活</strong>：记录生活中的点点滴滴，留下美好的回忆</li>
<li><strong>分享知识</strong>：将学到的知识和经验分享给更多的人</li>
<li><strong>自我提升</strong>：通过写作来整理思路，提升表达能力</li>
<li><strong>建立连接</strong>：与志同道合的朋友建立联系</li>
</ol>
<h2>博客内容规划</h2>
<p>在这个博客中，我计划分享以下内容：</p>
<h3>生活记录</h3>
<ul>
<li>日常生活感悟</li>
<li>有趣的经历和故事</li>
<li>旅行见闻</li>
<li>美食分享</li>
</ul>
<h3>技术学习</h3>
<ul>
<li>编程学习笔记</li>
<li>项目开发经验</li>
<li>技术趋势分析</li>
<li>工具使用心得</li>
</ul>
<h3>个人成长</h3>
<ul>
<li>读书心得</li>
<li>思考感悟</li>
<li>目标规划</li>
<li>习惯养成</li>
</ul>
<h2>互动交流</h2>
<p>我非常期待与大家的互动交流！你可以通过以下方式联系我：</p>
<ul>
<li><strong>微信</strong>：扫描二维码或搜索微信号</li>
<li><strong>QQ</strong>：点击直接添加好友</li>
<li><strong>邮件</strong>：发送邮件到我的邮箱</li>
</ul>
<h2>结语</h2>
<p>希望这个博客能成为我与大家交流的桥梁，也欢迎大家通过各种方式与我联系！</p>
<p>让我们一起在这个数字世界中分享生活，交流思想，共同成长。</p>
<p>感谢你的阅读，期待你的留言和建议！</p>',
  '这是我的第一篇博客文章，很高兴能在这里与大家分享我的想法和经历。',
  'welcome',
  true,
  ARRAY['生活', '博客', '开始'],
  'admin'
),
(
  'React学习笔记：从入门到实践',
  '<h1>React学习笔记：从入门到实践</h1>
<p>最近在深入学习React框架，记录一些重要的概念和实践经验，希望对同样在学习React的朋友有所帮助。</p>
<h2>React基础概念</h2>
<h3>什么是React？</h3>
<p>React是由Facebook开发的一个用于构建用户界面的JavaScript库。它的核心思想是：</p>
<ul>
<li><strong>组件化</strong>：将UI拆分成独立、可复用的组件</li>
<li><strong>声明式</strong>：描述UI应该是什么样子，而不是如何操作DOM</li>
<li><strong>虚拟DOM</strong>：提高性能的关键技术</li>
</ul>
<h3>组件（Components）</h3>
<p>React应用是由组件构成的。组件是可重用的UI片段，可以是函数组件或类组件。</p>
<pre><code class="language-jsx">// 函数组件
function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return &lt;h1&gt;Hello, {this.props.name}&lt;/h1&gt;;
  }
}
</code></pre>
<h2>React Hooks</h2>
<p>React Hooks让函数组件也能使用状态和其他React特性。</p>
<h3>useState</h3>
<p>用于在函数组件中添加状态。</p>
<pre><code class="language-jsx">import { useState } from ''react'';

function Example() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<h2>总结</h2>
<p>React是一个强大的前端框架，掌握其核心概念对于现代前端开发非常重要。通过不断的学习和实践，我们可以构建出高质量的用户界面。</p>',
  '最近在深入学习React框架，记录一些重要的概念和实践经验，希望对同样在学习React的朋友有所帮助。',
  'react-learning',
  true,
  ARRAY['技术', 'React', '前端', 'JavaScript'],
  'admin'
),
(
  '如何搭建现代化个人博客：Next.js + Tailwind CSS完整指南',
  '<h1>如何搭建现代化个人博客：Next.js + Tailwind CSS完整指南</h1>
<p>在这个数字化时代，拥有一个个人博客是展示自己、分享知识的绝佳方式。今天我将分享如何使用Next.js和Tailwind CSS搭建一个现代化的个人博客。</p>
<h2>为什么选择这个技术栈？</h2>
<h3>Next.js的优势</h3>
<ol>
<li><strong>SSG支持</strong>：静态站点生成，SEO友好</li>
<li><strong>性能优秀</strong>：自动代码分割和优化</li>
<li><strong>开发体验</strong>：热重载、TypeScript支持</li>
<li><strong>部署简单</strong>：与Vercel完美集成</li>
</ol>
<h3>Tailwind CSS的优势</h3>
<ol>
<li><strong>实用优先</strong>：原子化CSS类，快速开发</li>
<li><strong>响应式设计</strong>：内置响应式断点</li>
<li><strong>可定制性</strong>：高度可配置的设计系统</li>
<li><strong>性能优化</strong>：自动清除未使用的CSS</li>
</ol>
<h2>搭建步骤详解</h2>
<h3>1. 项目初始化</h3>
<pre><code class="language-bash"># 创建Next.js项目
npx create-next-app@latest my-blog --typescript --tailwind --eslint --app

# 进入项目目录
cd my-blog

# 安装额外依赖
npm install gray-matter remark remark-html date-fns
</code></pre>
<h2>总结</h2>
<p>通过Next.js和Tailwind CSS，我们可以快速搭建一个现代化的个人博客。这个技术栈不仅开发效率高，而且性能优秀，SEO友好。</p>',
  '分享使用Next.js和Tailwind CSS搭建现代化博客的完整过程，包括技术选型、开发步骤和部署方案。',
  'build-blog',
  true,
  ARRAY['技术', 'Next.js', '教程', '博客', 'Tailwind CSS'],
  'admin'
);

-- 更新时间戳触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
