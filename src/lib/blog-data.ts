// 博客文章数据 - 客户端安全版本

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  author: string
  readTime: number
}

// 模拟博客文章数据
export const mockBlogPosts: BlogPost[] = [
  {
    id: 'react-hooks-guide',
    title: 'React Hooks 完全指南',
    excerpt: '深入了解 React Hooks 的使用方法和最佳实践，包括 useState、useEffect、useContext 等常用 Hook 的详细介绍。',
    content: `# React Hooks 完全指南

React Hooks 是 React 16.8 引入的新特性，它让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## useState Hook

useState 是最基本的 Hook，它让函数组件拥有状态：

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

useEffect 让你在函数组件中执行副作用操作：

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## 自定义 Hook

你可以创建自己的 Hook 来复用状态逻辑：

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
\`\`\`

## 总结

React Hooks 提供了一种更简洁、更灵活的方式来编写 React 组件。通过合理使用 Hooks，我们可以写出更易维护和测试的代码。`,
    date: '2024-01-20',
    tags: ['React', 'JavaScript', 'Frontend'],
    author: '博主',
    readTime: 8
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js App Router 深度解析',
    excerpt: '探索 Next.js 13+ 的 App Router 新特性，了解如何使用新的路由系统构建现代 Web 应用。',
    content: `# Next.js App Router 深度解析

Next.js 13 引入了全新的 App Router，基于 React Server Components 构建，提供了更强大的路由功能。

## 文件系统路由

App Router 使用文件系统进行路由：

\`\`\`
app/
  page.tsx          # /
  about/
    page.tsx        # /about
  blog/
    page.tsx        # /blog
    [slug]/
      page.tsx      # /blog/[slug]
\`\`\`

## 布局系统

新的布局系统更加灵活：

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

## Server Components

默认情况下，App Router 中的组件都是 Server Components：

\`\`\`typescript
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <main>{data.title}</main>
}
\`\`\`

## 数据获取

App Router 提供了新的数据获取方式：

\`\`\`typescript
// 静态生成
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  return posts.map((post) => ({ slug: post.slug }))
}

// 动态路由
export default async function Post({ params }: { params: { slug: string } }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`).then(res => res.json())
  return <article>{post.content}</article>
}
\`\`\`

## 总结

App Router 为 Next.js 应用带来了更好的性能和开发体验，值得深入学习和使用。`,
    date: '2024-01-18',
    tags: ['Next.js', 'React', 'SSR'],
    author: '博主',
    readTime: 12
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript 最佳实践',
    excerpt: '分享 TypeScript 开发中的最佳实践，包括类型定义、泛型使用、配置优化等方面的经验。',
    content: `# TypeScript 最佳实践

TypeScript 为 JavaScript 添加了静态类型检查，让我们能够写出更安全、更易维护的代码。

## 类型定义

### 接口 vs 类型别名

\`\`\`typescript
// 接口 - 推荐用于对象类型
interface User {
  id: number;
  name: string;
  email: string;
}

// 类型别名 - 推荐用于联合类型、原始类型等
type Status = 'loading' | 'success' | 'error';
type ID = string | number;
\`\`\`

### 泛型的使用

\`\`\`typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 实用类型

TypeScript 提供了许多实用的内置类型：

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Partial - 所有属性变为可选
type PartialUser = Partial<User>;

// Required - 所有属性变为必需
type RequiredUser = Required<User>;

// Pick - 选择特定属性
type UserBasic = Pick<User, 'id' | 'name'>;

// Omit - 排除特定属性
type UserWithoutId = Omit<User, 'id'>;
\`\`\`

## 配置优化

### tsconfig.json 推荐配置

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

## 总结

遵循这些最佳实践，可以让你的 TypeScript 代码更加健壮和易维护。`,
    date: '2024-01-15',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    author: '博主',
    readTime: 10
  },
  {
    id: 'css-grid-flexbox',
    title: 'CSS Grid 与 Flexbox 布局指南',
    excerpt: '详细对比 CSS Grid 和 Flexbox 的使用场景，学习如何选择合适的布局方案。',
    content: `# CSS Grid 与 Flexbox 布局指南

CSS Grid 和 Flexbox 是现代 CSS 布局的两大利器，了解它们的特点和使用场景非常重要。

## Flexbox - 一维布局

Flexbox 适合处理一维布局（行或列）：

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.item {
  flex: 1;
}
\`\`\`

### Flexbox 常用属性

\`\`\`css
/* 容器属性 */
.flex-container {
  display: flex;
  flex-direction: row; /* row | column | row-reverse | column-reverse */
  justify-content: center; /* flex-start | flex-end | center | space-between | space-around */
  align-items: center; /* flex-start | flex-end | center | baseline | stretch */
  flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */
}

/* 项目属性 */
.flex-item {
  flex: 1; /* flex-grow flex-shrink flex-basis */
  align-self: center; /* auto | flex-start | flex-end | center | baseline | stretch */
}
\`\`\`

## CSS Grid - 二维布局

CSS Grid 适合处理二维布局（行和列）：

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.header {
  grid-column: 1 / -1;
}

.sidebar {
  grid-row: 2;
}

.main {
  grid-row: 2;
  grid-column: 2 / -1;
}

.footer {
  grid-column: 1 / -1;
}
\`\`\`

### Grid 常用属性

\`\`\`css
.grid-container {
  display: grid;
  
  /* 定义网格 */
  grid-template-columns: 200px 1fr 100px;
  grid-template-rows: auto 1fr auto;
  
  /* 间距 */
  gap: 1rem;
  row-gap: 1rem;
  column-gap: 2rem;
  
  /* 对齐 */
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.grid-item {
  /* 定位 */
  grid-column: 1 / 3;
  grid-row: 2;
  
  /* 对齐 */
  justify-self: start;
  align-self: end;
}
\`\`\`

## 选择指南

### 使用 Flexbox 当：
- 需要一维布局（行或列）
- 需要内容驱动的布局
- 需要对齐和分布空间

### 使用 Grid 当：
- 需要二维布局（行和列）
- 需要精确控制布局
- 需要重叠元素

## 实际案例

### 导航栏（Flexbox）
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}
\`\`\`

### 页面布局（Grid）
\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## 总结

Flexbox 和 Grid 各有优势，在实际项目中经常需要结合使用。理解它们的特点，选择合适的布局方案是关键。`,
    date: '2024-01-12',
    tags: ['CSS', 'Layout', 'Frontend'],
    author: '博主',
    readTime: 15
  },
  {
    id: 'javascript-es2024',
    title: 'JavaScript ES2024 新特性',
    excerpt: '了解 JavaScript ES2024 的最新特性，包括新的语法、API 和改进。',
    content: `# JavaScript ES2024 新特性

ES2024 为 JavaScript 带来了许多令人兴奋的新特性，让我们一起来了解这些改进。

## Array.prototype.toSorted()

新的数组方法，返回排序后的新数组，不修改原数组：

\`\`\`javascript
const numbers = [3, 1, 4, 1, 5];
const sorted = numbers.toSorted(); // [1, 1, 3, 4, 5]
console.log(numbers); // [3, 1, 4, 1, 5] - 原数组未改变

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

const sortedByAge = users.toSorted((a, b) => a.age - b.age);
\`\`\`

## Array.prototype.toReversed()

返回反转后的新数组：

\`\`\`javascript
const original = [1, 2, 3, 4, 5];
const reversed = original.toReversed(); // [5, 4, 3, 2, 1]
console.log(original); // [1, 2, 3, 4, 5] - 原数组未改变
\`\`\`

## Array.prototype.with()

返回指定索引处元素被替换的新数组：

\`\`\`javascript
const fruits = ['apple', 'banana', 'orange'];
const newFruits = fruits.with(1, 'grape'); // ['apple', 'grape', 'orange']
console.log(fruits); // ['apple', 'banana', 'orange'] - 原数组未改变
\`\`\`

## Array.prototype.toSpliced()

返回删除/插入元素后的新数组：

\`\`\`javascript
const items = ['a', 'b', 'c', 'd'];
const newItems = items.toSpliced(1, 2, 'x', 'y'); // ['a', 'x', 'y', 'd']
console.log(items); // ['a', 'b', 'c', 'd'] - 原数组未改变
\`\`\`

## Object.groupBy()

根据回调函数的返回值对数组元素进行分组：

\`\`\`javascript
const people = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'London' },
  { name: 'Charlie', age: 25, city: 'New York' },
  { name: 'David', age: 30, city: 'London' }
];

const groupedByAge = Object.groupBy(people, person => person.age);
// {
//   25: [{ name: 'Alice', age: 25, city: 'New York' }, { name: 'Charlie', age: 25, city: 'New York' }],
//   30: [{ name: 'Bob', age: 30, city: 'London' }, { name: 'David', age: 30, city: 'London' }]
// }

const groupedByCity = Object.groupBy(people, person => person.city);
\`\`\`

## Promise.withResolvers()

提供了一种更简洁的方式来创建 Promise：

\`\`\`javascript
// 传统方式
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// 新方式
const { promise, resolve, reject } = Promise.withResolvers();

// 使用示例
function createDelayedPromise(delay) {
  const { promise, resolve } = Promise.withResolvers();
  
  setTimeout(() => {
    resolve(\`Resolved after \${delay}ms\`);
  }, delay);
  
  return promise;
}
\`\`\`

## String.prototype.isWellFormed()

检查字符串是否包含孤立的代理项：

\`\`\`javascript
const validString = "Hello, 世界!";
const invalidString = "Hello\\uD800World"; // 包含孤立的高代理项

console.log(validString.isWellFormed()); // true
console.log(invalidString.isWellFormed()); // false
\`\`\`

## String.prototype.toWellFormed()

返回修复了孤立代理项的字符串：

\`\`\`javascript
const invalidString = "Hello\\uD800World";
const fixedString = invalidString.toWellFormed();
console.log(fixedString); // "Hello�World" (� 是替换字符)
\`\`\`

## 实际应用示例

### 不可变数组操作

\`\`\`javascript
class TodoList {
  constructor() {
    this.todos = [];
  }
  
  addTodo(todo) {
    this.todos = [...this.todos, { id: Date.now(), ...todo }];
  }
  
  updateTodo(id, updates) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos = this.todos.with(index, { ...this.todos[index], ...updates });
    }
  }
  
  removeTodo(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos = this.todos.toSpliced(index, 1);
    }
  }
  
  sortTodos(compareFn) {
    this.todos = this.todos.toSorted(compareFn);
  }
}
\`\`\`

### 数据分组和处理

\`\`\`javascript
function analyzeUserData(users) {
  // 按年龄分组
  const usersByAge = Object.groupBy(users, user => 
    user.age < 30 ? 'young' : user.age < 50 ? 'middle' : 'senior'
  );
  
  // 按部门分组并排序
  const usersByDepartment = Object.groupBy(users, user => user.department);
  
  for (const [dept, deptUsers] of Object.entries(usersByDepartment)) {
    usersByDepartment[dept] = deptUsers.toSorted((a, b) => a.name.localeCompare(b.name));
  }
  
  return { usersByAge, usersByDepartment };
}
\`\`\`

## 总结

ES2024 的这些新特性主要关注于提供更好的不可变操作支持和数据处理能力。这些特性让 JavaScript 代码更加函数式，也更容易维护。`,
    date: '2024-01-10',
    tags: ['JavaScript', 'ES2024', 'New Features'],
    author: '博主',
    readTime: 12
  },
  {
    id: 'web-performance-optimization',
    title: 'Web 性能优化实战指南',
    excerpt: '全面的 Web 性能优化指南，涵盖加载优化、渲染优化、网络优化等多个方面。',
    content: `# Web 性能优化实战指南

Web 性能优化是前端开发中的重要话题，好的性能能显著提升用户体验。

## 加载性能优化

### 资源压缩和优化

\`\`\`javascript
// 1. 代码分割
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 2. 图片优化
const ImageComponent = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    style={{ aspectRatio: '16/9' }}
  />
);
\`\`\`

### 预加载策略

\`\`\`html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 预加载关键资源 -->
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero-image.jpg" as="image">

<!-- 预获取下一页资源 -->
<link rel="prefetch" href="/next-page.js">
\`\`\`

## 渲染性能优化

### 避免布局抖动

\`\`\`css
/* 使用 transform 而不是改变 position */
.element {
  transform: translateX(100px);
  /* 而不是 left: 100px; */
}

/* 使用 will-change 提示浏览器 */
.animated-element {
  will-change: transform;
}

/* 完成动画后移除 will-change */
.animation-complete {
  will-change: auto;
}
\`\`\`

### React 性能优化

\`\`\`javascript
import { memo, useMemo, useCallback, useState } from 'react';

// 1. 使用 memo 避免不必要的重渲染
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  const handleClick = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// 2. 虚拟滚动
const VirtualList = ({ items, itemHeight = 50 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 400;
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={visibleStart + index}
            style={{
              position: 'absolute',
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
\`\`\`

## 网络优化

### HTTP/2 和 HTTP/3

\`\`\`javascript
// 利用 HTTP/2 多路复用
const fetchMultipleResources = async () => {
  const promises = [
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ];
  
  const [user, posts, comments] = await Promise.all(promises);
  
  return {
    user: await user.json(),
    posts: await posts.json(),
    comments: await comments.json()
  };
};
\`\`\`

### 缓存策略

\`\`\`javascript
// Service Worker 缓存策略
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    // 图片使用缓存优先策略
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches.open('images-v1').then((cache) => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  } else if (event.request.url.includes('/api/')) {
    // API 使用网络优先策略
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});
\`\`\`

## 监控和测量

### Core Web Vitals

\`\`\`javascript
// 测量 LCP (Largest Contentful Paint)
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP:', entry.startTime);
  }
}).observe({ entryTypes: ['largest-contentful-paint'] });

// 测量 FID (First Input Delay)
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('FID:', entry.processingStart - entry.startTime);
  }
}).observe({ entryTypes: ['first-input'] });

// 测量 CLS (Cumulative Layout Shift)
let clsValue = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
      console.log('CLS:', clsValue);
    }
  }
}).observe({ entryTypes: ['layout-shift'] });
\`\`\`

### 性能预算

\`\`\`javascript
// webpack.config.js
module.exports = {
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
\`\`\`

## 实用工具和技巧

### 图片优化

\`\`\`javascript
// 响应式图片
const ResponsiveImage = ({ src, alt, sizes }) => (
  <picture>
    <source
      media="(min-width: 768px)"
      srcSet={\`\${src}?w=800&f=webp 800w, \${src}?w=1200&f=webp 1200w\`}
      type="image/webp"
    />
    <source
      media="(min-width: 768px)"
      srcSet={\`\${src}?w=800 800w, \${src}?w=1200 1200w\`}
    />
    <source
      srcSet={\`\${src}?w=400&f=webp 400w, \${src}?w=600&f=webp 600w\`}
      type="image/webp"
    />
    <img
      src={\`\${src}?w=400\`}
      srcSet={\`\${src}?w=400 400w, \${src}?w=600 600w\`}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  </picture>
);
\`\`\`

### 字体优化

\`\`\`css
/* 字体显示策略 */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap; /* 或 fallback, optional */
}

/* 预加载关键字体 */
/* <link rel="preload" href="/fonts/critical-font.woff2" as="font" type="font/woff2" crossorigin> */
\`\`\`

## 总结

Web 性能优化是一个持续的过程，需要从多个维度进行考虑。通过合理的优化策略和持续的监控，我们可以为用户提供更好的体验。

记住：
1. 测量比猜测更重要
2. 用户体验比技术指标更重要
3. 持续优化比一次性优化更重要`,
    date: '2024-01-08',
    tags: ['Performance', 'Web', 'Optimization'],
    author: '博主',
    readTime: 20
  }
];

// 获取所有博客文章
export async function getAllPosts(): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, 500);
  });
}

// 根据ID获取单篇文章
export async function getPostById(id: string): Promise<BlogPost | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockBlogPosts.find(post => post.id === id);
      resolve(post || null);
    }, 300);
  });
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPosts = mockBlogPosts.filter(post => 
        post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
      resolve(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, 400);
  });
}

// 搜索文章
export async function searchPosts(query: string): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPosts = mockBlogPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, 400);
  });
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allTags = mockBlogPosts.flatMap(post => post.tags);
      const uniqueTags = [...new Set(allTags)];
      resolve(uniqueTags.sort());
    }, 200);
  });
}
