const image = (file) => `${import.meta.env.BASE_URL}images/${file}`

export const profile = {
  name: 'Susana I. Biondini',
  title: 'Escritora y actriz argentina',
  location: 'Nacida en Buenos Aires · Reside entre España y Estados Unidos',
  email: '',
  phone: '',
  phoneHref: '',
  socials: [],
  currentFocus: {
    label: 'Actualidad',
    summary:
      'Desde septiembre de 2026 es miembro de Arte Sur en Almuñécar, Granada, donde continúa su labor literaria y teatral.',
  },
  summary:
    'Susana I. Biondini nació en Buenos Aires el 8 de agosto de 1957. Se formó en teatro entre 1970 y 1974, y entre 1979 y 1982 participó de los talleres de escritura de Aunarte. Décadas después retomó el escenario en Miami con Actors Arena Group (2013–2018), donde escribió y estrenó el microteatro Bohemia. Hoy, integrada a Arte Sur en Almuñécar (Granada), sigue escribiendo narrativa, poesía y teatro con la misma vocación que la acompaña desde la adolescencia.',
  portraits: {
    hero: {
      src: image('susy_headshot_2.png'),
      alt: 'Retrato de Susana I. Biondini sonriendo al aire libre',
    },
    theater: {
      src: image('susy_talking.jpg'),
      alt: 'Susana I. Biondini en escena, leyendo ante un micrófono',
    },
    bio: {
      src: image('susy_halfbod.png'),
      alt: 'Susana I. Biondini con sombrero de paja en un entorno natural',
    },
  },
  highlights: [
    {
      id: 'bohemia',
      dates: '2014–2021',
      role: 'Microteatro Bohemia',
      org: 'Miami Dade College · Teatro Artefactus',
      summary:
        'Estreno en Miami Dade College (2014), funciones en Teatro Artefactus (2015) y en el Black Box del Miami Dade College (2021).',
    },
    {
      id: 'nagari',
      dates: '2015–2026',
      role: 'Poemas y cuentos',
      org: 'Revista Nagari',
      summary:
        'Publicaciones periódicas de poesía y narrativa en la revista literaria Nagari, de Miami.',
    },
    {
      id: 'fil-ba',
      dates: '2022',
      role: 'Participación internacional',
      org: 'Feria Internacional del Libro de Buenos Aires',
      summary:
        'Presencia en la Feria Internacional del Libro de Buenos Aires con su obra literaria.',
    },
    {
      id: 'fil-miami',
      dates: '2024',
      role: 'Participación internacional',
      org: 'Feria Internacional del Libro de Miami',
      summary:
        'Participación en la Feria Internacional del Libro de Miami, acercando su escritura al público de la diáspora y de Florida.',
    },
  ],
  books: [
    {
      id: 'aymara',
      title: 'Aymara',
      year: '2015',
      genre: 'Selección de poemas y cuentos',
      cover: image('aymara.avif'),
      amazonUrl: 'https://a.co/d/02YJzzx8',
      description: 'Su primer libro impreso de cuentos y poesía.',
    },
    {
      id: 'avatares',
      title: 'Avatares',
      year: '2016 · reedición 2021',
      genre: 'Novela',
      cover: image('avatares.avif'),
      amazonUrl: 'https://a.co/d/094B3O84',
      description:
        'Novela breve de suspenso y ternura, centrada en el perdón, la solidaridad y un dilema ético inesperado.',
    },
    {
      id: 'hipocresia',
      title: 'Hipocresía',
      year: '2021',
      genre: 'Cuentos y poesía',
      cover: image('hipocresia.avif'),
      amazonUrl: 'https://a.co/d/0iCNOoVr',
      description: 'Libro de poemas y textos que dialogan con la libertad, la memoria y la ética.',
    },
    {
      id: 'bohemia',
      title: 'Bohemia',
      year: '2015',
      genre: 'Microteatro · obra de teatro de formato pequeño',
      cover: image('bohemia.avif'),
      amazonUrl: 'https://a.co/d/0h8UOIw1',
      description: 'Pieza de microteatro estrenada en Miami y publicada en formato de libro.',
    },
  ],
}
