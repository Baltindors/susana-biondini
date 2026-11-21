import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const galleryDir = path.join(root, 'public', 'images', 'gallery')
const outFile = path.join(root, 'src', 'content', 'gallery.json')

const captionsByFile = {
  'Bohemia.jpg':
    'Bohemia: microteatro estrenado en Miami, donde la escritura y la escena se encuentran.',
  'Bohemia.flyer.jpg':
    'Material gráfico de difusión para las funciones de Bohemia.',
  'BOHEMIA DESPEDIDA.jpg':
    'Cierre de temporada: el público acompaña la despedida de Bohemia.',
  'Black-Box.jpg':
    'El Black Box del Miami Dade College acogió nuevas lecturas y montajes.',
  'Actuacion.jpg':
    'La actuación como extensión natural de la escritura teatral.',
  'Recital.jpg':
    'Recitales donde la voz da cuerpo a la narrativa y la poesía.',
  'Mi primer libro.jpg':
    'La presentación del primer libro: un hito en la trayectoria literaria.',
  'Presentation-Avatares_n.jpg':
    'Presentación de Avatares ante lectores y amigos de la literatura.',
  'Presentation-Hipocresia.jpg':
    'Hipocresía en la mesa de presentación: diálogo con el público lector.',
}

const altByFile = {
  'Bohemia.jpg': 'Escena de la obra Bohemia',
  'Bohemia4.jpg': 'Momento de la puesta en escena de Bohemia',
  'Bohemia.flyer.jpg': 'Flyer promocional de Bohemia',
  'Bohemia-balck-box.jpg': 'Bohemia en el Black Box del Miami Dade College',
  'BOHEMIA DESPEDIDA.jpg': 'Función de despedida de Bohemia',
  'Black-Box.jpg': 'Función en el Black Box',
  'Scenas.2-Bohemia.jpg': 'Escena de Bohemia en el escenario',
  'Scenas.3-Bohemia.jpg': 'Otra escena de Bohemia',
  'Actuacion.jpg': 'Susana I. Biondini en actuación',
  'Recital.jpg': 'Recital literario',
  'Recitando.jpg': 'Susana I. Biondini recitando',
  'Poncia.jpg': 'Interpretación de Poncia',
  'Las Manolas.jpg': 'Escena de Las Manolas',
  'Mi primer libro.jpg': 'Presentación del primer libro',
  'Presentation-Avatares_n.jpg': 'Presentación de Avatares',
  'Presentacion-Hipocresia.jpg': 'Presentación de Hipocresía',
  'Presentation-Hipocresia.jpg': 'Presentación del libro Hipocresía',
  'Presentacion-Hipocresia-2.jpg': 'Segunda imagen de la presentación de Hipocresía',
  'Me.jpg': 'Retrato de Susana I. Biondini',
  'Me-1.jpg': 'Retrato de Susana I. Biondini',
  'Me.2.jpg': 'Retrato de Susana I. Biondini',
  'Me.3.jpg': 'Retrato de Susana I. Biondini',
  'Me.4.jpg': 'Retrato de Susana I. Biondini',
}

function defaultAlt(filename) {
  if (/^IMG_/i.test(filename)) return 'Fotografía de archivo personal'
  if (/^\d+_/.test(filename)) return 'Fotografía de archivo de eventos'
  return `Imagen de la galería: ${filename}`
}

function preferredOrder(filename) {
  const priority = [
    'Bohemia.jpg',
    'Bohemia4.jpg',
    'Bohemia.flyer.jpg',
    'Bohemia-balck-box.jpg',
    'BOHEMIA DESPEDIDA.jpg',
    'Black-Box.jpg',
    'Scenas.2-Bohemia.jpg',
    'Scenas.3-Bohemia.jpg',
    'Actuacion.jpg',
    'Recital.jpg',
    'Recitando.jpg',
    'Poncia.jpg',
    'Las Manolas.jpg',
    'Mi primer libro.jpg',
    'Presentation-Avatares_n.jpg',
    'Presentacion-Hipocresia.jpg',
    'Presentation-Hipocresia.jpg',
    'Presentacion-Hipocresia-2.jpg',
    'Me.jpg',
    'Me-1.jpg',
    'Me.2.jpg',
    'Me.3.jpg',
    'Me.4.jpg',
  ]
  const idx = priority.indexOf(filename)
  return idx === -1 ? priority.length + filename.localeCompare(filename) : idx
}

const files = fs
  .readdirSync(galleryDir)
  .filter((name) => /\.jpe?g$/i.test(name))
  .sort((a, b) => preferredOrder(a) - preferredOrder(b) || a.localeCompare(b, 'es'))

const items = files.map((filename) => {
  const item = {
    image: `/images/gallery/${filename}`,
    alt: altByFile[filename] ?? defaultAlt(filename),
  }
  if (captionsByFile[filename]) item.caption = captionsByFile[filename]
  return item
})

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(items, null, 2)}\n`, 'utf8')

console.log(`Seeded ${items.length} gallery items → ${path.relative(root, outFile)}`)
