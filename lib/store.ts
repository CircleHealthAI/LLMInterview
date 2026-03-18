import { create } from 'zustand'
import { Document, sampleDocuments } from './document'

const STORAGE_KEY = 'llm-insights-documents'

function loadFromStorage(): Document[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function persistToStorage(documents: Document[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
  } catch {
    console.error('Failed to persist documents to localStorage')
  }
}

interface DocumentStore {
  documents: Document[]
  initialized: boolean
  init: () => void
  addDocument: (doc: Document) => void
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  initialized: false,

  init: () => {
    if (get().initialized) return
    const stored = loadFromStorage()
    if (stored.length === 0) {
      persistToStorage(sampleDocuments)
      set({ documents: sampleDocuments, initialized: true })
    } else {
      set({ documents: stored, initialized: true })
    }
  },

  addDocument: (doc) => {
    set((state) => {
      const updated = [...state.documents.filter((d) => d.id !== doc.id), doc]
      persistToStorage(updated)
      return { documents: updated }
    })
  },
}))
