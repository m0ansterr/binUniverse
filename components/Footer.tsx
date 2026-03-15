import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center">
        <span>binuniverse</span>
      </div>
      
      <div className="links">
        <Link href="/about" className="link">
          about
        </Link>
        <Link href="/docs" className="link">
          docs
        </Link>
        <Link href="/api-docs" className="link">
          api
        </Link>
      </div>
      
      <div id="copyright" className="ml-auto text-sm opacity-75">
        Copyright <i className="far fa-copyright"></i> 2026 -
        <i className="fas fa-cat ml-1 mr-1"></i>
        <a href="https://github.com/m0ansterr" rel="noopener" target="_blank" className="hover:opacity-100 transition-opacity">
          Moanster
        </a>
      </div>
    </footer>
  )
}
