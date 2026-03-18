export function generateDocumentId(): string {
  return `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export async function parseDocumentFile(file: File): Promise<{ title: string; content: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/parse-document', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to parse document')
  }

  return response.json()
}
