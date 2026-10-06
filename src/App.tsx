import { useState, useEffect } from 'react'

export default function App() {
  const [data, setData] = useState<string>('Loading...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function check() {
      try {
        const tokenRes = await fetch('/api/latest/api/token', {
          method: 'PUT',
          headers: { 'X-aws-ec2-metadata-token-ttl-seconds': '21600' },
        })
        const token = await tokenRes.text()

        const metaRes = await fetch('/api/latest/meta-data/', {
          headers: { 'X-aws-ec2-metadata-token': token },
        })
        const meta = await metaRes.text()
        setData(`Token: ${token.slice(0, 20)}...\n\n${meta}`)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err))
      }
    }
    check()
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
