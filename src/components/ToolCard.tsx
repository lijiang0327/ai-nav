'use client'

import { useState } from 'react'
import { Tool } from '@/types'
import Image from 'next/image'

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  const [imgSrc, setImgSrc] = useState(tool.image || '/fallback.png')

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      {imgSrc && (
        <div className="relative h-32 overflow-hidden">
          <Image
            src={imgSrc}
            alt={tool.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgSrc('/fallback.png')}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {tool.name}
          </h3>
          <div className="flex gap-1">
            {tool.isHot && (
              <span className="px-1 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                热门
              </span>
            )}
            {tool.isNew && (
              <span className="px-1 py-0.5 bg-green-100 text-green-600 text-xs rounded">
                新品
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {tool.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 2 && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              +{tool.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </a>
  )
} 