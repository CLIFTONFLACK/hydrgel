import { useEffect } from 'react'

/**
 * Sets the document title, meta description and canonical URL per route.
 * Without this every client-side route inherits the home page's tags, which
 * costs us on both search and link previews.
 */
export function useDocumentMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title

    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    const url = `https://hydrgel.com${path}`

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', url)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', url)
  }, [title, description, path])
}
