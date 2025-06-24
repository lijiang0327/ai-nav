'use client'

import { Category } from '@/types'
import {
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  PhotoIcon,
  VideoCameraIcon,
  BriefcaseIcon,
  CpuChipIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  ServerIcon,
  AcademicCapIcon,
  CubeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, React.ReactNode> = {
  writing: <PencilSquareIcon className="w-5 h-5 text-pink-500" />,
  image: <PhotoIcon className="w-5 h-5 text-purple-500" />,
  video: <VideoCameraIcon className="w-5 h-5 text-red-500" />,
  office: <BriefcaseIcon className="w-5 h-5 text-blue-500" />,
  agent: <CpuChipIcon className="w-5 h-5 text-indigo-500" />,
  chat: <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-500" />,
  coding: <CodeBracketIcon className="w-5 h-5 text-emerald-500" />,
  design: <PaintBrushIcon className="w-5 h-5 text-orange-500" />,
  audio: <MusicalNoteIcon className="w-5 h-5 text-teal-500" />,
  search: <MagnifyingGlassIcon className="w-5 h-5 text-cyan-500" />,
  platform: <ServerIcon className="w-5 h-5 text-gray-600" />,
  learning: <AcademicCapIcon className="w-5 h-5 text-yellow-500" />,
  model: <CubeIcon className="w-5 h-5 text-fuchsia-500" />,
  evaluation: <ChartBarIcon className="w-5 h-5 text-lime-500" />,
  detection: <ShieldCheckIcon className="w-5 h-5 text-rose-500" />,
  prompt: <CommandLineIcon className="w-5 h-5 text-slate-600" />,
}

interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside className="hidden md:block w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI工具分类</h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className="w-full flex items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-2">
                {iconMap[category.id] || <CommandLineIcon className="w-5 h-5 text-gray-400" />}
                {category.name}
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
