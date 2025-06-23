import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import cron from 'node-cron';

const TOOLS_YML_PATH = path.join(__dirname, 'data/tools.yml');

// 1. 读取本地 tools.yml
function readToolsYml() {
  if (!fs.existsSync(TOOLS_YML_PATH)) return { tools: [] };
  const file = fs.readFileSync(TOOLS_YML_PATH, 'utf8');
  return yaml.load(file);
}

// 2. 写入 tools.yml
function writeToolsYml(data) {
  const ymlStr = yaml.dump(data, { lineWidth: 120 });
  fs.writeFileSync(TOOLS_YML_PATH, ymlStr, 'utf8');
}

// 3. 抓取 Hugging Face 热门模型
async function fetchHuggingFaceModels() {
  try {
    const res = await axios.get('https://huggingface.co/models?sort=trending');
    const $ = cheerio.load(res.data);
    const models = [];
    $('.models-list .model-card').each((i, el) => {
      const name = $(el).find('.model-card-name').text().trim();
      const url = 'https://huggingface.co' + $(el).find('a').attr('href');
      const description = $(el).find('.model-card-description').text().trim();
      if (name && url) {
        models.push({
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name,
          description,
          url,
          category: 'model',
          tags: ['HuggingFace', '开源'],
          image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop'
        });
      }
    });
    return models;
  } catch (e) {
    console.error('抓取 Hugging Face 失败:', e.message);
    return [];
  }
}

// 4. 抓取 ModelScope 热门模型
async function fetchModelScopeModels() {
  try {
    const res = await axios.get('https://modelscope.cn/models?sort=hot');
    const $ = cheerio.load(res.data);
    const models = [];
    $('.model-card').each((i, el) => {
      const name = $(el).find('.model-title').text().trim();
      const url = 'https://modelscope.cn' + ($(el).find('a').attr('href') || '');
      const description = $(el).find('.model-desc').text().trim();
      if (name && url) {
        models.push({
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name,
          description,
          url,
          category: 'model',
          tags: ['ModelScope', '开源'],
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        });
      }
    });
    return models;
  } catch (e) {
    console.error('抓取 ModelScope 失败:', e.message);
    return [];
  }
}

// 5. 抓取百度文心一言（示例：只收录主页信息）
async function fetchWenxinYiyan() {
  return [{
    id: 'wenxin-yiyan',
    name: '文心一言',
    description: '百度推出的多模态大模型，支持文本、图像、语音等多种AI能力。',
    url: 'https://yiyan.baidu.com',
    category: 'model',
    tags: ['多模态', '百度', '中文', '开源'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'
  }];
}

// 6. 抓取 OpenAI ChatGPT（示例：只收录主页信息）
async function fetchOpenAIChatGPT() {
  return [{
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI开发的大型语言模型，能够进行自然语言对话和文本生成',
    url: 'https://chat.openai.com',
    category: 'chat',
    tags: ['AI对话', '文本生成', 'OpenAI'],
    image: 'https://chat.openai.com/favicon.ico'
  }];
}

// 7. 合并新数据到 tools.yml
function mergeTools(tools, newItems) {
  const ids = new Set(tools.map(t => t.id));
  for (const item of newItems) {
    if (!ids.has(item.id)) {
      tools.push(item);
      ids.add(item.id);
    }
  }
  return tools;
}

// 8. 主流程
async function updateToolsYml() {
  let data = readToolsYml();
  if (!data.tools) data.tools = [];
  const allNew = [];
  // 可扩展更多平台
  allNew.push(...await fetchHuggingFaceModels());
  allNew.push(...await fetchModelScopeModels());
  allNew.push(...await fetchWenxinYiyan());
  allNew.push(...await fetchOpenAIChatGPT());
  data.tools = mergeTools(data.tools, allNew);
  writeToolsYml(data);
  console.log(`[${new Date().toLocaleString()}] tools.yml 已自动更新！`);
}

// 9. 定时任务：每6小时自动执行一次
cron.schedule('0 */6 * * *', updateToolsYml);

// 10. 项目启动时立即执行一次
updateToolsYml();

// 导出主函数，便于手动调用
export { updateToolsYml }; 