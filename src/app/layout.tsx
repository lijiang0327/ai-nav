import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { getCategories, getTools } from '@/lib/data'

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [categories, tools] = await Promise.all([
    getCategories(),
    getTools(),
  ])

  return (
    <html lang="zh" className="overflow-x-hidden">
      <body className="bg-gray-50">
        <div className="flex h-screen">
          {/* 左侧边栏 */}
          <Sidebar categories={categories} />
          
          {/* 主内容区 */}
          <div className="flex-1 flex flex-col">
            <Header tools={tools} />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
