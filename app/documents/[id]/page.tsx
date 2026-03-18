'use client'

import { useEffect, useState } from 'react'
import { useDocumentStore } from '@/lib/store'
import { InsightsResponse } from '@/app/api/insights/route'
import { Box, Button, Container, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

interface DocumentPageProps {
  params: {
    id: string
  }
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { documents, initialized, init } = useDocumentStore()
  const [insights, setInsights] = useState<InsightsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    init()
  }, [init])

  // undefined = still initializing, null = not found, Document = found
  const document = initialized ? (documents.find((d) => d.id === params.id) ?? null) : undefined

  const getInsights = async () => {
    if (!document) return

    setLoading(true)
    setError(null)

    try {
      // TODO: This will call the Ollama API once you implement it
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  if (document === undefined) {
    return (
      <Box minH="100vh" bg="gray.50" py={12}>
        <Container maxW="3xl" mx="auto" px={6} textAlign="center">
          <Spinner color="blue.600" size="xl" />
          <Text mt={4} color="gray.600">
            Loading document...
          </Text>
        </Container>
      </Box>
    )
  }

  if (document === null) {
    return (
      <Box minH="100vh" bg="gray.50" py={12}>
        <Container maxW="3xl" mx="auto" px={6} textAlign="center">
          <Heading size="lg" color="red.600" mb={4}>
            Document Not Found
          </Heading>
          <Text color="gray.600" mb={6}>
            No document with ID &quot;{params.id}&quot; exists.
          </Text>
          <Link href="/">
            <Button colorPalette="blue">← Back to Documents</Button>
          </Link>
        </Container>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="3xl" mx="auto" px={6}>
        <Stack gap={6}>
          {/* Header */}
          <Stack gap={2}>
            <Link href="/">
              <Text color="blue.600" _hover={{ color: 'blue.800' }} display="inline-block">
                ← Back to Documents
              </Text>
            </Link>
            <Heading size="2xl">Document Analysis</Heading>
            <Text color="gray.600">View document content and generate AI-powered insights</Text>
          </Stack>

          {/* Document Card */}
          <Box bg="white" rounded="lg" shadow="md" p={6}>
            <Stack gap={1} mb={4}>
              <Heading size="lg">{document.title}</Heading>
              <Text fontSize="sm" color="gray.500">
                Created: {new Date(document.createdAt).toLocaleDateString()}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Document ID: {document.id}
              </Text>
            </Stack>
            <Box pt={4} borderTop="1px solid" borderColor="gray.200">
              <Button
                colorPalette="blue"
                onClick={getInsights}
                loading={loading}
                padding={2}
                loadingText="Analyzing with AI..."
              >
                Generate Insights
              </Button>
            </Box>
          </Box>

          {/* Error */}
          {error && (
            <Box bg="red.50" border="1px solid" borderColor="red.200" rounded="lg" p={4}>
              <Text fontWeight="medium" color="red.800">
                Error
              </Text>
              <Text fontSize="sm" color="red.800" mt={1}>
                {error}
              </Text>
            </Box>
          )}
          {/* TODO: Display document content */}
          {/* TODO: Display insights once generated */}
          { insights && <Box>{JSON.stringify(insights)}</Box>}
        </Stack>
      </Container>
    </Box>
  )
}
