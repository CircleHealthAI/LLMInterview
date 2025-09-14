import { NextRequest, NextResponse } from 'next/server';
import * as mammoth from 'mammoth';

export interface ParseDocumentResponse {
  title: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();
    const fileType = file.type;
    let content: string;

    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      // Simple text file
      content = await file.text();
    } else if (fileName.endsWith('.pdf') || fileType === 'application/pdf') {
      // PDF parsing - placeholder for now
      return NextResponse.json(
        { error: 'PDF parsing not yet implemented - upload .txt or .docx files for now' },
        { status: 400 }
      );
    } else if (fileName.endsWith('.docx') || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // DOCX parsing using mammoth
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        content = result.value;
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to parse DOCX file: ${error instanceof Error ? error.message : 'Unknown error'}` },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: ${fileType || 'unknown'} (${fileName})` },
        { status: 400 }
      );
    }

    const response: ParseDocumentResponse = {
      title: file.name,
      content: content
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to parse document' },
      { status: 500 }
    );
  }
}