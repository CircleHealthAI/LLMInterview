'use client'

import { useState, useEffect } from 'react'
import { sampleDocuments, Document } from '@/lib/document'
import { InsightsResponse } from '@/app/api/insights/route'
import { parseDocumentFile, generateDocumentId, saveDocument, getAllDocuments } from '@/lib/documentStorage'
import Link from 'next/link'

export default function Home() {
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Load documents from localStorage on component mount
  useEffect(() => {
    const storedDocuments = getAllDocuments()
    if (storedDocuments.length === 0) {
      // If no documents in localStorage, add all sample documents
      sampleDocuments.forEach(doc => saveDocument(doc))
      setUploadedDocuments(sampleDocuments)
    } else {
      setUploadedDocuments(storedDocuments)
    }
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      // Parse the uploaded file using server-side API
      const { title, content } = await parseDocumentFile(file)
      
      // Create a new document object
      const newDocument: Document = {
        id: generateDocumentId(),
        title: title,
        content: content,
        createdAt: new Date().toISOString()
      }
      
      // Save document to storage
      saveDocument(newDocument)
      
      // Refresh documents list from storage
      setUploadedDocuments(getAllDocuments())
      
      // Clear the file input
      event.target.value = ''
      
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LLM Insights Viewer
          </h1>
          <p className="text-gray-600">
            Full-Stack Interview Exercise: Upload and analyze documents
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upload Document
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".txt,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              {isUploading ? 'Uploading...' : 'Choose File'}
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Support for .txt and .docx files
            </p>
          </div>

          {uploadError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-red-800 text-sm">{uploadError}</div>
            </div>
          )}
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Documents
          </h2>
          
          {uploadedDocuments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No documents uploaded yet. Upload your first document above!
            </p>
          ) : (
            <div className="space-y-4">
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.title}</h3>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {doc.content.length > 100 ? `${doc.content.substring(0, 100)}...` : doc.content}
                      </p>
                    </div>
                    <div className="ml-4">
                      <Link
                        href={`/documents/${doc.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                      >
                        View Insights
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}