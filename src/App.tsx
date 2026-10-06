import { useState, useEffect } from 'react'

export default function App() {
  const [data, setData] = useState<string>('Loading...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/latest/meta-data/')
      .then(async res => {
        const text = await res.text()
        setData(text || '(empty response)')
      })
      .catch(err => setError(err.message))
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', padding: 24, background: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 20 }}>Status</h1>
      {error ? (
        <p style={{ color: '#f44' }}>Error: {error}</p>
      ) : (
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{data}</pre>
      )}
    </div>
  )
}
