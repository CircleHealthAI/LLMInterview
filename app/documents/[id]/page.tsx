'use client'

import { useState, useEffect } from 'react'
import { Document } from '@/lib/document'
import { InsightsResponse } from '@/app/api/insights/route'
import { getDocumentById } from '@/lib/documentStorage'
import Link from 'next/link'

interface DocumentPageProps {
  params: {
    id: string
  }
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const [document, setDocument] = useState<Document | null>(null)
  const [insights, setInsights] = useState<InsightsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [documentError, setDocumentError] = useState<string | null>(null)

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const doc = getDocumentById(params.id)
        
        if (!doc) {
          setDocumentError('Document not found')
          return
        }
        
        setDocument(doc)
      } catch (err) {
        setDocumentError('Failed to load document')
        console.error('Document loading error:', err)
      }
    }

    loadDocument()
  }, [params.id])

  const getInsights = async () => {
    if (!document) return

    setLoading(true)
    setError(null)
    
    try {
      // TODO: This will call the OpenAI API once the candidate implements it
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: document.content }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get insights')
      }

      const data: InsightsResponse = await response.json()
      setInsights(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (documentError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Document Not Found</h1>
            <p className="text-gray-600 mb-6">{documentError}</p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              ← Back to Documents
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading document...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Documents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Document Analysis
          </h1>
          <p className="text-gray-600">
            View document content and generate AI-powered insights
          </p>
        </div>

        {/* Document Display */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {document.title}
            </h2>
            <p className="text-sm text-gray-500">
              Created: {new Date(document.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Document ID: {document.id}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={getInsights}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {loading ? 'Analyzing with AI...' : 'Generate Insights'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-800">
                <h3 className="font-medium">Error</h3>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        {/* TODO: Add insights display */}
        <div className="prose max-w-none">
          {JSON.stringify(insights)}
        </div>
      </div>
    </div>
  )
}