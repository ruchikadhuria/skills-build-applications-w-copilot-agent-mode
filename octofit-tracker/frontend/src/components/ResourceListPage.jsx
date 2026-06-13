import { useEffect, useMemo, useState } from 'react'

function toAbsoluteUrl(url, baseUrl) {
  if (!url) {
    return null
  }

  try {
    return new URL(url, baseUrl).toString()
  } catch {
    return null
  }
}

function normalizeResponse(payload, requestUrl) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      next: null,
      previous: null,
      count: payload.length,
    }
  }

  if (!payload || typeof payload !== 'object') {
    return {
      items: [],
      next: null,
      previous: null,
      count: 0,
    }
  }

  const candidateItems = [payload.results, payload.items, payload.data]
  const items = candidateItems.find((value) => Array.isArray(value)) ?? [payload]

  const next =
    toAbsoluteUrl(payload.next ?? payload.links?.next ?? null, requestUrl) ?? null
  const previous =
    toAbsoluteUrl(
      payload.previous ?? payload.prev ?? payload.links?.previous ?? null,
      requestUrl,
    ) ?? null

  const count =
    typeof payload.count === 'number'
      ? payload.count
      : typeof payload.total === 'number'
        ? payload.total
        : items.length

  return { items, next, previous, count }
}

function ResourceListPage({ title, endpoint }) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  const stableEndpoint = useMemo(() => endpoint, [endpoint])
  const resource = useMemo(() => {
    const path = new URL(stableEndpoint, window.location.origin).pathname
    const parts = path.split('/').filter(Boolean)
    return parts.at(-1) ?? title.toLowerCase()
  }, [stableEndpoint, title])

  const [requestUrl, setRequestUrl] = useState(stableEndpoint)
  const [items, setItems] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [previousPageUrl, setPreviousPageUrl] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadResource() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(requestUrl)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizeResponse(payload, requestUrl)

        if (!isMounted) {
          return
        }

        setItems(normalized.items)
        setNextPageUrl(normalized.next)
        setPreviousPageUrl(normalized.previous)
        setTotalCount(normalized.count)
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setItems([])
        setNextPageUrl(null)
        setPreviousPageUrl(null)
        setTotalCount(0)
        setError(fetchError instanceof Error ? fetchError.message : 'Unknown error')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadResource()

    return () => {
      isMounted = false
    }
  }, [requestUrl])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-2">{title}</h2>
        <p className="text-body-secondary small mb-3">
          Endpoint: <code>{stableEndpoint}</code>
        </p>

        {!codespaceName && (
          <p className="text-warning-emphasis small">
            Using localhost fallback because VITE_CODESPACE_NAME is not set.
          </p>
        )}

        <div className="d-flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
              onClick={() => setRequestUrl(stableEndpoint)}
            disabled={loading}
          >
            Refresh
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => previousPageUrl && setRequestUrl(previousPageUrl)}
            disabled={loading || !previousPageUrl}
          >
            Previous page
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => nextPageUrl && setRequestUrl(nextPageUrl)}
            disabled={loading || !nextPageUrl}
          >
            Next page
          </button>
          <span className="badge text-bg-light align-self-center">
            Total: {totalCount}
          </span>
          <span className="badge text-bg-light align-self-center">
            Showing: {items.length}
          </span>
        </div>

        {loading && <p>Loading {title.toLowerCase()}...</p>}

        {!loading && error && (
          <div className="alert alert-danger py-2 mb-0" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="mb-0">No data returned.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="list-group">
            {items.map((item, index) => (
              <article key={item.id ?? item._id ?? `${resource}-${index}`} className="list-group-item">
                <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourceListPage
