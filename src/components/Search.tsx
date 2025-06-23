import { useState, useEffect, useRef } from 'react'
import { Tool } from '@/types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import pinyin from 'pinyin'
import Link from 'next/link'

interface SearchProps {
  tools: Tool[]
  onSearch?: (results: Tool[]) => void
}

function getPinyin(str: string) {
  return pinyin(str, { style: pinyin.STYLE_NORMAL })
    .flat()
    .join('')
    .toLowerCase()
}

function highlight(text: string, keyword: string) {
  if (!keyword) return text
  const reg = new RegExp(`(${keyword})`, 'gi')
  return text.replace(reg, '<mark>$1</mark>')
}

export function Search({ tools, onSearch }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      onSearch?.([])
      setShowDropdown(false)
      return
    }
    const q = query.toLowerCase().trim()
    const qPinyin = getPinyin(q)
    const filtered = tools.filter(tool => {
      const name = tool.name.toLowerCase()
      const desc = tool.description.toLowerCase()
      const tags = tool.tags.join(' ').toLowerCase()
      const namePinyin = getPinyin(tool.name)
      const tagPinyin = getPinyin(tags)
      return (
        name.includes(q) ||
        desc.includes(q) ||
        tags.includes(q) ||
        namePinyin.includes(qPinyin) ||
        tagPinyin.includes(qPinyin)
      )
    })
    setResults(filtered)
    onSearch?.(filtered)
    setShowDropdown(true)
    setActiveIndex(-1)
  }, [query, tools, onSearch])

  // 键盘操作
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!showDropdown) return
      if (e.key === 'ArrowDown') {
        setActiveIndex(i => Math.min(i + 1, Math.max(0, results.length - 1)))
        e.preventDefault()
      } else if (e.key === 'ArrowUp') {
        setActiveIndex(i => Math.max(i - 1, 0))
        e.preventDefault()
      } else if (e.key === 'Enter') {
        if (results[activeIndex]) {
          window.open(results[activeIndex].url, '_blank')
          setShowDropdown(false)
        }
      } else if (e.key === 'Escape') {
        setShowDropdown(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showDropdown, results, activeIndex])

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      window.addEventListener('mousedown', handleClick)
    }
    return () => window.removeEventListener('mousedown', handleClick)
  }, [showDropdown])

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
          placeholder="搜索AI工具、功能或标签... 支持拼音"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        />
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-auto"
          style={{ top: '100%' }}
        >
          {results.length === 0 ? (
            <div className="p-6 text-center text-gray-400">未找到相关工具</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {results.slice(0, 8).map((tool, idx) => (
                <li key={tool.id}>
                  <Link
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${activeIndex === idx ? 'bg-blue-50' : ''}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setShowDropdown(false)}
                  >
                    <span className="w-8 h-8 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                      {tool.image && (
                        <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className="block font-medium text-gray-900 text-sm truncate"
                        dangerouslySetInnerHTML={{ __html: highlight(tool.name, query) }}
                      />
                      <span
                        className="block text-xs text-gray-500 truncate"
                        dangerouslySetInnerHTML={{ __html: highlight(tool.description, query) }}
                      />
                    </span>
                    {tool.isHot && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">热门</span>}
                    {tool.isNew && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">新品</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
} 