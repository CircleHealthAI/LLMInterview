import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/client';

export interface InsightsSummary {
  documentId: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllInsightsResponse {
  insights: InsightsSummary[];
  count: number;
}

export async function GET() {
  try {
    const allInsights = await db
      .selectFrom('insights')
      .selectAll()
      .orderBy('updatedAt', 'desc')
      .execute();

    const insights: InsightsSummary[] = allInsights.map(insight => ({
      documentId: insight.documentId,
      summary: insight.summary,
      createdAt: new Date(insight.createdAt).toISOString(),
      updatedAt: new Date(insight.updatedAt).toISOString(),
    }));

    const response: GetAllInsightsResponse = {
      insights,
      count: insights.length
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { documentIds } = await request.json();

    let query = db
      .selectFrom('insights')
      .selectAll()
      .orderBy('updatedAt', 'desc');

    if (documentIds && Array.isArray(documentIds)) {
      query = query.where('documentId', 'in', documentIds);
    }

    const filteredInsights = await query.execute();

    const insights: InsightsSummary[] = filteredInsights.map(insight => ({
      documentId: insight.documentId,
      summary: insight.summary,
      createdAt: new Date(insight.createdAt).toISOString(),
      updatedAt: new Date(insight.updatedAt).toISOString(),
    }));

    const response: GetAllInsightsResponse = {
      insights,
      count: insights.length
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching filtered insights:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch filtered insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
