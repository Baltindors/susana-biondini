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

// #region agent log
fetch('http://127.0.0.1:7935/ingest/78ad64d2-dd14-4c31-8439-b58578706c0f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7c97eb'},body:JSON.stringify({sessionId:'7c97eb',runId:'post-fix',hypothesisId:'B',location:'src/data/gallery.js:rawItems',message:'Gallery loader parsed seed',data:{isTopLevelArray:Array.isArray(gallery),hasItemsProp:Array.isArray(gallery?.items),count:rawItems.length,firstImage:rawItems[0]?.image??null},timestamp:Date.now()})}).catch(()=>{});
// #endregion

export const galleryItems = rawItems.map((item, index) => ({
  id: idFromPath(item.image, index),
  src: resolveImage(item.image),
  alt: item.alt ?? '',
  caption: item.caption?.trim() ? item.caption.trim() : '',
}))