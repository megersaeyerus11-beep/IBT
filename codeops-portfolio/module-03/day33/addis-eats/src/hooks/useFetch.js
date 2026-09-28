import { useState, useEffect } from 'react'


export function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function load() {
            setLoading(true)
            setError(null)

            try {
                const res = await fetch(url, { signal: controller.signal })
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()
                setData(json)
            } catch (err) {
                // Ignore the "error" that fires when we abort on cleanup
                if (err.name !== 'AbortError') setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        load()

        return () => controller.abort()
    }, [url])

    return { data, loading, error }
}