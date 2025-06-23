export function NewsSection() {
  return (
    <div className="space-y-6">
      {/* AI快讯 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI快讯</h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              OpenAI发布GPT-5最新进展
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              OpenAI宣布GPT-5开发进展，预计将在2024年底发布...
            </p>
            <span className="text-xs text-gray-500">2024-01-15</span>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Anthropic发布Claude 3.5 Sonnet
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              新版本在推理能力和代码生成方面有显著提升...
            </p>
            <span className="text-xs text-gray-500">2024-01-14</span>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Google推出Gemini Advanced
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Google发布Gemini Advanced，支持更复杂的多模态任务...
            </p>
            <span className="text-xs text-gray-500">2024-01-13</span>
          </div>
        </div>
      </section>

      {/* 最新AI项目 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">最新AI项目</h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Stable Diffusion 3
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              最新版本的图像生成模型，支持更高分辨率和更好的文本理解...
            </p>
            <span className="text-xs text-gray-500">开源项目</span>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Llama 3
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Meta发布的最新开源大语言模型，性能大幅提升...
            </p>
            <span className="text-xs text-gray-500">开源项目</span>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Mistral 7B
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              轻量级但性能强大的语言模型，适合本地部署...
            </p>
            <span className="text-xs text-gray-500">开源项目</span>
          </div>
        </div>
      </section>

      {/* AI百科 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI百科</h3>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
            • 什么是大语言模型？
          </a>
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
            • AI绘画技术发展历程
          </a>
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
            • 提示词工程入门指南
          </a>
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
            • AI工具使用技巧
          </a>
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
            • 如何选择合适的AI工具
          </a>
        </div>
      </section>
    </div>
  )
} 