'use client'

import { useState } from 'react'
import { Category, Tool } from '@/types'
import { Search } from '@/components/Search'
import Link from 'next/link'
import Image from 'next/image'

interface ClientPageProps {
  categories: Category[]
  tools: Tool[]
  hotTools: Tool[]
  newTools: Tool[]
}

export default function ClientPage({
  categories,
  tools,
  hotTools,
  newTools,
}: ClientPageProps) {
  const [searchResults, setSearchResults] = useState<Tool[]>([])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              发现最好的AI工具
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              精选优质AI工具和资源，助你提升工作效率
            </p>
          </div>
          <Search tools={tools} onSearch={setSearchResults} />
        </div>
      </section>

      {searchResults.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            搜索结果
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Hot Tools Section */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              🔥 热门推荐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>

          {/* New Tools Section */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              ✨ 最新工具
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              分类导航
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  const [imgSrc, setImgSrc] = useState(tool.image || '/fallback.png')
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      {imgSrc && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imgSrc}
            alt={tool.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgSrc('/fallback.png')}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          <div className="flex gap-2">
            {tool.isHot && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                热门
              </span>
            )}
            {tool.isNew && (
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                新品
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 group"
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{category.icon}</span>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">
        {category.description}
      </p>
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {category.subcategories.slice(0, 3).map((sub) => (
            <span
              key={sub.name}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {sub.name}
            </span>
          ))}
          {category.subcategories.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{category.subcategories.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  )
} 