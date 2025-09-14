import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // Prepare update/create data
    const insightData = {
      summary
    };

    // Upsert the insights (create or update if exists)
    const insights = await prisma.insights.upsert({
      where: {
        documentId: documentId
      },
      update: {
        ...insightData,
        updatedAt: new Date()
      },
      create: {
        documentId: documentId,
        ...insightData
      }
    });

    return NextResponse.json({
      success: true,
      insights: {
        documentId: insights.documentId,
        summary: insights.summary,
        createdAt: insights.createdAt,
        updatedAt: insights.updatedAt
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