import { Document } from './document'

const STORAGE_KEY = 'llm-insights-documents'

// Helper functions for localStorage
function loadDocumentsFromStorage(): Document[] {
  if (typeof window === 'undefined') {
    // Server-side rendering - return empty array
    return []
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load documents from localStorage:', error)
  }
  
  return []
}

function saveDocumentsToStorage(documents: Document[]): void {
  if (typeof window === 'undefined') {
    // Server-side rendering - skip storage
    return
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
  } catch (error) {
    console.error('Failed to save documents to localStorage:', error)
  }
}

// Initialize documents store from localStorage
let documentsStore: Document[] = loadDocumentsFromStorage()

export function getAllDocuments(): Document[] {
  // Refresh from localStorage in case another tab updated it
  documentsStore = loadDocumentsFromStorage()
  return documentsStore
}

export function getDocumentById(id: string): Document | null {
  // Refresh from localStorage in case another tab updated it
  documentsStore = loadDocumentsFromStorage()
  const document = documentsStore.find(doc => doc.id === id)
  return document || null
}

export function saveDocument(document: Document): void {
  // Refresh from localStorage first
  documentsStore = loadDocumentsFromStorage()
  
  // Remove existing document with same ID if it exists
  documentsStore = documentsStore.filter(doc => doc.id !== document.id)
  
  // Add the new/updated document
  documentsStore.push(document)
  
  // Save to localStorage
  saveDocumentsToStorage(documentsStore)
}

export function deleteDocument(id: string): boolean {
  // Refresh from localStorage first
  documentsStore = loadDocumentsFromStorage()
  
  const initialLength = documentsStore.length
  documentsStore = documentsStore.filter(doc => doc.id !== id)
  
  // Save to localStorage
  saveDocumentsToStorage(documentsStore)
  
  return documentsStore.length < initialLength
}

export function generateDocumentId(): string {
  // TODO: Consider using a more robust ID generation method
  // For production, you might want to use UUID or ensure uniqueness across distributed systems
  return `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Utility function to parse files using server-side API
export async function parseDocumentFile(file: File): Promise<{ title: string; content: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/parse-document', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to parse document')
  }

  return await response.json()
}