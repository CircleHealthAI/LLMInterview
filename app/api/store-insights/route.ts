import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'

export interface StoreInsightsRequest {
  documentId: string
  summary: string
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as StoreInsightsRequest
    const { documentId, summary } = data

    if (!documentId || !summary) {
      return NextResponse.json({ error: 'documentId and summary are required' }, { status: 400 })
    }

    const now = new Date()

    await db
      .insertInto('insights')
      .values({
        documentId,
        summary,
        createdAt: now.getTime(),
        updatedAt: now.getTime(),
      })
      .execute()

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Error storing insights:', error)
    return NextResponse.json(
      {
        error: 'Failed to store insights',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
