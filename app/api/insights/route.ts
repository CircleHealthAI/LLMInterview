import { NextRequest, NextResponse } from 'next/server'
import { Ollama } from 'ollama'

export interface InsightsResponse {
  summary: string
  comprehensionScore: number
  isNonFiction: boolean
  suggestedEdits: string[]
}

export async function POST(request: NextRequest) {
  const { text } = await request.json()

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Invalid input: text field is required' }, { status: 400 })
  }

  // TODO: Replace this mock implementation with Ollama API integration

  const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434'
  const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2'

  // Initialize Ollama client
  const ollama = new Ollama({ host: ollamaHost })

  // TODO: Implement the Ollama API call here
  // See README for hints on the API structure

  return NextResponse.json({
    error: 'Not implemented',
  })
}
