'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  pasteSlug?: string
  onSave?: () => void
  onNew?: () => void
}

export default function Header({ pasteSlug, onSave, onNew }: HeaderProps) {
  const router = useRouter()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement
    if (newTheme === 'light') {
      root.style.setProperty('--bg-color', 'var(--bg-light-color)')
      root.style.setProperty('--bg2-color', 'var(--bg2-light-color)')
      root.style.setProperty('--main-color', 'var(--main-light-color)')
      root.style.setProperty('--border-color', 'var(--border-light-color)')
      root.style.setProperty('--scrollbar-color', 'var(--scrollbar-light-color)')
      root.style.setProperty('--scrollbar-active-color', 'var(--scrollbar-light-active-color)')
      root.style.setProperty('--placeholder-color', 'var(--placeholder-light-color)')
      root.style.setProperty('--linenumber-color', 'var(--linenumber-light-color)')
    } else {
      root.style.setProperty('--bg-color', 'var(--bg-dark-color)')
      root.style.setProperty('--bg2-color', 'var(--bg2-dark-color)')
      root.style.setProperty('--main-color', 'var(--main-dark-color)')
      root.style.setProperty('--border-color', 'var(--border-dark-color)')
      root.style.setProperty('--scrollbar-color', 'var(--scrollbar-dark-color)')
      root.style.setProperty('--scrollbar-active-color', 'var(--scrollbar-dark-active-color)')
      root.style.setProperty('--placeholder-color', 'var(--placeholder-dark-color)')
      root.style.setProperty('--linenumber-color', 'var(--linenumber-dark-color)')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const handleNew = () => {
    if (onNew) {
      onNew()
    } else {
      router.push('/')
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
  }

  const copyUrl = () => {
    if (pasteSlug) {
      const url = `${window.location.origin}/paste/${pasteSlug}`
      navigator.clipboard.writeText(url)

      const urlElement = document.getElementById('url')
      if (urlElement) {
        const originalText = urlElement.textContent
        urlElement.textContent = 'Copied!'
        setTimeout(() => {
          urlElement.textContent = originalText
        }, 1500)
      }
    }
  }

  return (
    <header>
      <div className="flex items-center">
        <span className="text-2xl binuniverse-logo">bin...</span>
        <div className="divider ml-4"></div>
      </div>

      {pasteSlug && (
        <div
          id="url"
          className="cursor-pointer hover:opacity-100 transition-opacity"
          onClick={copyUrl}
          title="Click to copy URL"
        >
          {pasteSlug}
        </div>
      )}

      <div className="actions flex items-center">
        <button
          id="theme"
          className="action"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          <i className={`fas fa-${theme === 'dark' ? 'moon' : 'sun'}`}></i>
        </button>
        {onSave && (
          <button
            id="save"
            className="action"
            onClick={handleSave}
            title="Save (Ctrl+S)"
          >
            <i className="fas fa-save"></i>
          </button>
        )}
        <button
          id="new"
          className="action"
          onClick={handleNew}
          title="New paste (Ctrl+N)"
        >
          <i className="faPlus"></i>
        </button>
      </div>
    </header>
  )
}
