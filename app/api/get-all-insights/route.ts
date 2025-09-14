import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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
    // Fetch all insights from the database
    const allInsights = await prisma.insights.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Transform the data to match our response interface
    const insights: InsightsSummary[] = allInsights.map(insight => ({
      documentId: insight.documentId,
      summary: insight.summary,
      createdAt: insight.createdAt.toISOString(),
      updatedAt: insight.updatedAt.toISOString()
    }));

    const response: GetAllInsightsResponse = {
      insights: insights,
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

// Optional: Also support POST for filtered queries in the future
export async function POST(request: NextRequest) {
  try {
    const { documentIds } = await request.json();

    let whereCondition = {};
    if (documentIds && Array.isArray(documentIds)) {
      whereCondition = {
        documentId: {
          in: documentIds
        }
      };
    }

    const filteredInsights = await prisma.insights.findMany({
      where: whereCondition,
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const insights: InsightsSummary[] = filteredInsights.map((insight: Prisma.InsightsGetPayload<{}>) => ({
      documentId: insight.documentId,
      summary: insight.summary,
      createdAt: insight.createdAt.toISOString(),
      updatedAt: insight.updatedAt.toISOString()
    }));

    const response: GetAllInsightsResponse = {
      insights: insights,
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