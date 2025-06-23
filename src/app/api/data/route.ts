import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { Category, Tool } from '@/types'

const dataDir = path.join(process.cwd(), 'data')

export async function GET() {
  try {
    const categoriesPath = path.join(dataDir, 'categories.yml')
    const toolsPath = path.join(dataDir, 'tools.yml')

    const categoriesContent = fs.readFileSync(categoriesPath, 'utf8')
    const toolsContent = fs.readFileSync(toolsPath, 'utf8')

    const categoriesData = yaml.load(categoriesContent) as { categories: Category[] }
    const toolsData = yaml.load(toolsContent) as { tools: Tool[] }

    return NextResponse.json({
      categories: categoriesData.categories,
      tools: toolsData.tools,
    })
  } catch (error) {
    console.error('Error loading data:', error)
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    )
  }
} 