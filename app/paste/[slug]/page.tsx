import React from 'react'
import { notFound } from 'next/navigation'
import { supabase, type Paste } from '@/lib/supabase'
import PasteViewer from '@/components/PasteViewer'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPaste(slug: string): Promise<Paste | null> {
  try {
    console.log('=== getPaste function called ===')
    console.log('Input slug:', slug)
    console.log('Slug type:', typeof slug)
    console.log('Slug length:', slug.length)
    
    const { data, error } = await supabase
      .from('pastes')
      .select('*')
      .eq('slug', slug)
      .single()

    console.log('=== Supabase response ===')
    console.log('Raw data:', data)
    console.log('Raw error:', error)
    console.log('Data type:', typeof data)
    console.log('Error type:', typeof error)

    if (error) {
      console.error('=== Supabase error detected ===')
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      return null
    }

    console.log('=== Paste found successfully ===')
    console.log('Paste data:', JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error('=== Unexpected error in getPaste ===')
    console.error('Error type:', typeof error)
    console.error('Error:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return null
  }
}

export default async function PastePage({ params }: PageProps) {
  console.log('=== PastePage component called ===')
  console.log('Params received:', params)
  console.log('Params.slug:', params.slug)
  
  const paste = await getPaste(params.slug)

  console.log('=== After getPaste call ===')
  console.log('Paste result:', paste)
  console.log('Paste is null?', paste === null)
  console.log('Paste is undefined?', paste === undefined)

  if (!paste) {
    console.log('=== Triggering notFound() ===')
    console.log('Paste was falsy, calling notFound()')
    notFound()
  }

  // Temporarily bypass Shiki for debugging
  const highlightedCode = paste.content

  return <PasteViewer slug={params.slug} highlightedCode={highlightedCode} />
}
