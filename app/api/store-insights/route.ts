import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/client';

export interface StoreInsightsRequest {
  documentId: string;
  summary: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as StoreInsightsRequest;
    const { documentId, summary } = data;

    if (!documentId || !summary) {
      return NextResponse.json(
        { error: 'documentId and summary are required' },
        { status: 400 }
      );
    }

    const now = new Date();

    const result = await db
      .insertInto('Insights')
      .values({
        documentId,
        summary,
        createdAt: now.getTime(),
        updatedAt: now.getTime(),
      })
      .onConflict((oc) =>
        oc.column('documentId').doUpdateSet({
          summary,
          updatedAt: now.getTime(),
        })
      )
      .returningAll()
      .executeTakeFirstOrThrow();

    return NextResponse.json({
      success: true,
      insights: {
        documentId: result.documentId,
        summary: result.summary,
        createdAt: new Date(result.createdAt).toISOString(),
        updatedAt: new Date(result.updatedAt).toISOString(),
      }
    });

  } catch (error) {
    console.error('Error storing insights:', error);
    return NextResponse.json(
      {
        error: 'Failed to store insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
