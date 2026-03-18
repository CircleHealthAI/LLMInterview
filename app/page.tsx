'use client'

import { useEffect, useState } from 'react'
import { useDocumentStore } from '@/lib/store'
import { parseDocumentFile, generateDocumentId } from '@/lib/documentStorage'
import { Document } from '@/lib/document'
import { Box, Button, Container, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  const { documents, initialized, init, addDocument } = useDocumentStore()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  // TODO: Use this state to implement ascending/descending sort by comprehension score
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => {
    init()
  }, [init])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const { title, content } = await parseDocumentFile(file)
      const newDocument: Document = {
        id: generateDocumentId(),
        title,
        content,
        createdAt: new Date().toISOString(),
      }
      addDocument(newDocument)
      event.target.value = ''
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="3xl" mx="auto" px={6}>
        <Stack gap={8}>
          <Stack gap={2} textAlign="center">
            <Heading size="3xl">LLM Insights Viewer</Heading>
            <Text color="gray.600" fontSize="lg">
              Full-Stack Interview Exercise: Upload and analyze documents
            </Text>
          </Stack>

          {/* File Upload */}
          <Box bg="white" rounded="lg" shadow="md" p={6}>
            <Heading size="md" mb={4}>
              Upload Document
            </Heading>
            <Box border="2px dashed" borderColor="gray.300" rounded="lg" p={6} textAlign="center">
              <input
                type="file"
                accept=".txt,.docx"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  padding={2}
                  as="span"
                  colorPalette="blue"
                  loading={isUploading}
                  loadingText="Uploading..."
                  cursor="pointer"
                >
                  Choose File
                </Button>
              </label>
              <Text mt={2} fontSize="sm" color="gray.500">
                Supports .txt and .docx files
              </Text>
            </Box>

            {uploadError && (
              <Box mt={4} bg="red.50" border="1px solid" borderColor="red.200" rounded="lg" p={3}>
                <Text color="red.800" fontSize="sm">
                  {uploadError}
                </Text>
              </Box>
            )}
          </Box>

          {/* Documents List */}
          <Box bg="white" rounded="lg" shadow="md" p={6}>
            <HStack justify="space-between" mb={4}>
              <Heading size="md">Your Documents</Heading>
              {/* TODO: Wire this button up to sortAsc state and sort the documents list */}
              <Button size="sm" variant="outline" onClick={() => setSortAsc(!sortAsc)}>
                Score: {sortAsc ? 'Low → High' : 'High → Low'}
              </Button>
            </HStack>

            {!initialized ? (
              <Box textAlign="center" py={8}>
                <Spinner color="blue.600" />
              </Box>
            ) : documents.length === 0 ? (
              <Text color="gray.500" textAlign="center" py={8}>
                No documents uploaded yet. Upload your first document above!
              </Text>
            ) : (
              <Stack gap={4}>
                {documents.map((doc) => {
                  return (
                    <Box
                      key={doc.id}
                      border="1px solid"
                      borderColor="gray.200"
                      rounded="lg"
                      p={4}
                      _hover={{ bg: 'gray.50' }}
                      transition="background 0.2s"
                    >
                      <HStack justify="space-between" align="start">
                        <Stack gap={1}>
                          <Text fontWeight="medium">{doc.title}</Text>
                          <Text fontSize="sm" color="gray.500">
                            Created: {new Date(doc.createdAt).toLocaleDateString()}
                          </Text>
                        </Stack>
                        <Box flexShrink={0}>
                          <Link href={`/documents/${doc.id}`}>
                            <Button size="sm" colorPalette="blue" variant="subtle" padding={2}>
                              View Insights
                            </Button>
                          </Link>
                        </Box>
                      </HStack>
                    </Box>
                  )
                })}
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
