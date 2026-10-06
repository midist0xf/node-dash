import { useState, useEffect } from 'react'

const PATHS = [
  '/api/meta-data/',
  '/api/meta-data/instance-id',
  '/api/meta-data/iam/',
  '/api/meta-data/iam/security-credentials/',
  '/api/user-data',
  '/api/dynamic/instance-identity/document',
  '/api/latest/meta-data/',
  '/api/latest/dynamic/instance-identity/document',
  '/api/latest/user-data',
]

export default function App() {
  const [results, setResults] = useState<Record<string, string>>({})

  useEffect(() => {
    PATHS.forEach(p => {
      fetch(p)
        .then(async res => {
          const text = await res.text()
          setResults(prev => ({ ...prev, [p]: `${res.status} ${text.slice(0, 300)}` }))
        })
        .catch(err => {
          setResults(prev => ({ ...prev, [p]: `ERR ${err.message}` }))
        })
    })
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', padding: 24, background: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 20 }}>Status</h1>
      {PATHS.map(p => (
        <div key={p} style={{ marginBottom: 12, borderBottom: '1px solid #333', paddingBottom: 8 }}>
          <div style={{ color: '#888', fontSize: 11 }}>{p}</div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, margin: 0 }}>
            {results[p] || '⏳'}
          </pre>
        </div>
      ))}
    </div>
  )
}
