const CHANNEL = 'UCMCPgNy-hkEGRMVJ0hEJsAg'
const decode = text => text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
  if (entity[0] === '#') {
    const n = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1))
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ''
  }
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[entity.toLowerCase()]
})
export function parseUploads(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1]
    const channel = entry.match(/<yt:channelId>([^<]+)<\/yt:channelId>/)?.[1]
    if (!id || !/^[\w-]{11}$/.test(id) || !title || channel !== CHANNEL || !published || !Number.isFinite(Date.parse(published))) return []
    return [{ id, title: decode(title), published }]
  }).sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).slice(0, 3)
}
export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).end() }
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL}`, { signal: AbortSignal.timeout(8000) })
    if (!response.ok) throw new Error('Feed unavailable')
    const videos = parseUploads(await response.text())
    if (!videos.length) throw new Error('No valid uploads')
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=10800, stale-while-revalidate=86400')
    return res.status(200).json({ videos })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(503).json({ videos: [] })
  }
}
