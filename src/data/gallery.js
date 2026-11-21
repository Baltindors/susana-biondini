import gallery from '../content/gallery.json'

function resolveImage(path) {
  if (!path) return ''
  const normalized = String(path).replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}

function idFromPath(path, index) {
  const file = String(path).split('/').pop() ?? `item-${index}`
  return file.replace(/\.[^.]+$/, '') || `item-${index}`
}

const rawItems = Array.isArray(gallery)
  ? gallery
  : Array.isArray(gallery?.items)
    ? gallery.items
    : []

export const galleryItems = rawItems.map((item, index) => ({
  id: idFromPath(item.image, index),
  src: resolveImage(item.image),
  alt: item.alt ?? '',
  caption: item.caption?.trim() ? item.caption.trim() : '',
}))
