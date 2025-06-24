'use client'

import { useState } from 'react'
import { Tool } from '@/types'
import Link from 'next/link'
import { Search } from '@/components/Search'

interface HeaderProps {
  tools: Tool[]
}

export function Header({ tools }: HeaderProps) {
  const [searchResults, setSearchResults] = useState<Tool[]>([])

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between group">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 hidden sm:inline">
          AI工具集
        </Link>

        {/* 搜索框外层加relative，宽度自适应 */}
        <div className="flex-1 mx-8 relative search-animate-width">
          <Search tools={tools} onSearch={setSearchResults} />
        </div>

        {/* 右侧导航 */}
        <nav className="flex items-center space-x-6 group-focus-within:hidden md:group-focus-within:block">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900"
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            首页
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900"
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            关于我们
          </Link>
        </nav>
      </div>

      {/* 搜索结果下拉 */}
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    <p className="text-sm text-gray-600 truncate">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 