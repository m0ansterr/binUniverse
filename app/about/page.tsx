import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="binuniverse-layout">
      <Header />
      
      <div id="content" className="binuniverse-editor">
        <div className="markdown p-8">
          <h1 className="text-3xl font-bold mb-6">About binuniverse</h1>
          
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              binuniverse is a simple pastebin service that allows you to share code snippets,
              text, and other content with others. Whether you&apos;re collaborating on a project,
              sharing code for debugging, or just need a quick way to store text temporarily,
              binuniverse has you covered.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Syntax highlighting for multiple programming languages</li>
              <li>Simple and clean interface</li>
              <li>Fast and reliable</li>
              <li>No registration required</li>
              <li>Raw text access</li>
              <li>RESTful API</li>
              <li>Dark and light theme support</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy</h2>
            <p>
              All pastes are public and can be accessed by anyone with the link. We don&apos;t track
              users or collect personal information. Please don&apos;t paste sensitive information
              like passwords, API keys, or personal data.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Usage</h2>
            <p>
              Simply paste your content in the text area, and it will be automatically saved. 
              You can then share the generated URL with others. Use keyboard shortcuts:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><code>Ctrl+S</code> - Save paste</li>
              <li><code>Ctrl+N</code> - New paste</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Source Code</h2>
            <p>
              binuniverse is open source and available on GitHub. You can view the source code,
              report issues, or contribute to the project:
            </p>
            <p className="mt-2">
              <a 
                href="https://github.com/m0ansterr/binUniverse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                https://github.com/m0ansterr/binUniverse
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
