'use client'

import { Tool } from '@/types'
import Image from 'next/image'
import { useState } from 'react'

interface ToolListProps {
  tools: Tool[]
}

export function ToolList({ tools }: ToolListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
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