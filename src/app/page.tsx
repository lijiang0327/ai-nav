import { getCategories, getHotTools, getNewTools, getTools } from '@/lib/data'
import { ToolCard } from '@/components/ToolCard'
import { Category, Tool } from '@/types'
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

export default async function Home() {
  const [categories, hotTools, newTools, allTools] = await Promise.all([
    getCategories(),
    getHotTools(),
    getNewTools(),
    getTools(),
  ])

  // 分类分组
  const toolsByCategory: Record<string, Tool[]> = {}
  for (const tool of allTools) {
    if (!toolsByCategory[tool.category]) toolsByCategory[tool.category] = []
    toolsByCategory[tool.category].push(tool)
  }

  return (
    <div className="flex">
      {/* 主内容区 */}
      <div className="flex-1 p-6 space-y-12">
        {/* 热门工具平铺 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔥 热门工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* 最新工具平铺 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ 最新工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* 分类分组导航 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">分类导航</h2>
          <div className="space-y-10">
            {categories.map((category: Category) => (
              <div key={category.id} id={category.id}>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">{iconMap[category.id] || <CommandLineIcon className="w-5 h-5 text-gray-400" />}</span>
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(toolsByCategory[category.id] || []).map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
