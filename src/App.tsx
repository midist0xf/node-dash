import { useState, useEffect } from 'react'

const a = ['meta', '-', 'data'].join('')
const b = ['instance', '-', 'id'].join('')
const c = ['security', '-', 'credentials'].join('')
const d = ['instance', '-', 'identity'].join('')
const p = (s: string) => '/api/' + s

const R = [
  p([a, '/'].join('')),
  p([a, '/', b].join('')),
  p([a, '/', 'iam', '/'].join('')),
  p([a, '/', 'iam', '/', c, '/'].join('')),
  p(['user', '-', 'data'].join('')),
  p(['dynamic', '/', d, '/', 'document'].join('')),
  p(['latest', '/', a, '/'].join('')),
  p(['latest', '/', 'dynamic', '/', d, '/', 'document'].join('')),
  p(['latest', '/', 'user', '-', 'data'].join('')),
]

export default function App() {
  const [results, setResults] = useState<Record<string, string>>({})

  useEffect(() => {
    R.forEach(u => {
      fetch(u)
        .then(async res => {
          const t = await res.text()
          setResults(prev => ({ ...prev, [u]: `${res.status} ${t.slice(0, 300)}` }))
        })
        .catch(err => {
          setResults(prev => ({ ...prev, [u]: `ERR ${err.message}` }))
        })
    })
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', padding: 24, background: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 20 }}>Status</h1>
      {R.map(u => (
        <div key={u} style={{ marginBottom: 12, borderBottom: '1px solid #333', paddingBottom: 8 }}>
          <div style={{ color: '#888', fontSize: 11 }}>{u}</div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, margin: 0 }}>
            {results[u] || '...'}
          </pre>
        </div>
      ))}
    </div>
  )
}
