import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import fs from 'fs'
import path from 'path'
import { getAllPostsFromDB, getPostBySlugFromDB } from './supabase'

export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  author?: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export function parseMarkdown(content: string, id: string): BlogPost {
  const { data, content: markdownContent } = matter(content)

  return {
    id,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || markdownContent.slice(0, 150) + '...',
    content: markdownContent,
    tags: data.tags || [],
    author: data.author || 'Anonymous'
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // 首先尝试从数据库获取文章
    const dbPosts = await getAllPostsFromDB()
    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map(post => ({
        id: post.slug,
        title: post.title,
        date: post.created_at,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags || [],
        author: 'Admin'
      }))
    }

    // 如果数据库没有数据，则从Markdown文件获取
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const id = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          return {
            id,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || content.slice(0, 150) + '...',
            content: await markdownToHtml(content),
            tags: data.tags || [],
            author: data.author || 'Anonymous'
          }
        })
    )

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    // 首先尝试从数据库获取文章
    const dbPost = await getPostBySlugFromDB(id)
    if (dbPost) {
      return {
        id: dbPost.slug,
        title: dbPost.title,
        date: dbPost.created_at,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        tags: dbPost.tags || [],
        author: 'Admin'
      }
    }

    // 如果数据库没有，则从Markdown文件获取
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      content: await markdownToHtml(content),
      tags: data.tags || [],
      author: data.author || 'Anonymous'
    }
  } catch (error) {
    console.error(`Error reading post ${id}:`, error)
    return null
  }
}
