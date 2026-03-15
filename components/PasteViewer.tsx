'use client'

import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

interface PasteViewerProps {
  slug: string
  highlightedCode: string
}

export default function PasteViewer({ slug, highlightedCode }: PasteViewerProps) {
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        window.location.href = '/'
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  return (
    <div className="binuniverse-layout">
      <Header pasteSlug={slug} />

      <div id="content" className="binuniverse-editor readonly">
        <div className="h-full overflow-auto p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {highlightedCode}
          </pre>
        </div>
      </div>

      <Footer />
    </div>
  )
}
