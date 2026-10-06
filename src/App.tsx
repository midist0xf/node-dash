import { useState, useEffect } from 'react'

export default function App() {
  const [data, setData] = useState<string>('Loading...')

  useEffect(() => {
    fetch('/api/')
      .then(res => res.text())
      .then(setData)
      .catch(() => setData('Unavailable'))
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', padding: 24, background: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 20 }}>Node Status</h1>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{data}</pre>
    </div>
  )
}
