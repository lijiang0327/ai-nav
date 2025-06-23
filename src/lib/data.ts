import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { Category, Tool } from '@/types'

let cachedData: {
  categories: Category[]
  tools: Tool[]
} | null = null

const dataDir = path.join(process.cwd(), 'data')

async function loadServerData() {
  if (cachedData) {
    return cachedData
  }

  const categoriesPath = path.join(dataDir, 'categories.yml')
  const toolsPath = path.join(dataDir, 'tools.yml')

  const categoriesContent = fs.readFileSync(categoriesPath, 'utf8')
  const toolsContent = fs.readFileSync(toolsPath, 'utf8')

  const categoriesData = yaml.load(categoriesContent) as { categories: Category[] }
  const toolsData = yaml.load(toolsContent) as { tools: Tool[] }

  cachedData = {
    categories: categoriesData.categories,
    tools: toolsData.tools,
  }

  return cachedData
}

async function loadClientData() {
  if (cachedData) {
    return cachedData
  }

  const response = await fetch('/api/data')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()
  cachedData = data
  return data
}

export async function getCategories(): Promise<Category[]> {
  const isServer = typeof window === 'undefined'
  const data = await (isServer ? loadServerData() : loadClientData())
  return data.categories
}

export async function getTools(): Promise<Tool[]> {
  const isServer = typeof window === 'undefined'
  const data = await (isServer ? loadServerData() : loadClientData())
  return data.tools
}

export async function getToolsByCategory(categoryId: string): Promise<Tool[]> {
  const tools = await getTools()
  return tools.filter(tool => tool.category === categoryId)
}

export async function getHotTools(): Promise<Tool[]> {
  const tools = await getTools()
  return tools.filter(tool => tool.isHot)
}

export async function getNewTools(): Promise<Tool[]> {
  const tools = await getTools()
  return tools.filter(tool => tool.isNew)
}
