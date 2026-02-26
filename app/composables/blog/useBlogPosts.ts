export const BLOG_ORGANIZAR_LIGA_SLUG = '/blog/como-organizar-liga-futbol-amateur'
export const BLOG_MEJORES_APPS_SLUG = '/blog/mejores-apps-para-administrar-torneos-futbol-2026'
export const BLOG_ROL_JUEGOS_SLUG = '/blog/como-hacer-rol-de-juegos-liga-futbol'
export const BLOG_REGLAMENTO_PLANTILLA_SLUG = '/blog/reglamento-liga-futbol-amateur-plantilla'
export const BLOG_TABLA_POSICIONES_SLUG = '/blog/como-calcular-tabla-de-posiciones-futbol'

export type BlogPostPreview = {
  slug: string
  title: string
  description: string
  keyword: string
  readTime: string
  publishedAt: string
  heroImage: string
}

const blogPosts: BlogPostPreview[] = [
  {
    slug: BLOG_TABLA_POSICIONES_SLUG,
    title: 'Cómo calcular la tabla de posiciones en fútbol (guía simple)',
    description: 'Aprende a calcular puntos, diferencia de goles y desempates en una liga de fútbol con ejemplo paso a paso.',
    keyword: 'cómo calcular la tabla de posiciones en fútbol',
    readTime: '8 min de lectura',
    publishedAt: '26 de febrero de 2026',
    heroImage: '/images/functionalities/blogs/como-calcular-tabla-de-posiciones-futbol/hero.webp',
  },
  {
    slug: BLOG_REGLAMENTO_PLANTILLA_SLUG,
    title: 'Reglamento para liga de fútbol amateur: plantilla gratis',
    description:
      'Descarga una estructura práctica de reglamento para tu liga amateur: puntuación, desempates, sanciones, registro y transferencias.',
    keyword: 'reglamento para liga de fútbol amateur',
    readTime: '9 min de lectura',
    publishedAt: '26 de febrero de 2026',
    heroImage: '/images/functionalities/blogs/reglamento-liga-futbol-amateur-plantilla/hero.webp',
  },
  {
    slug: BLOG_ROL_JUEGOS_SLUG,
    title: 'Cómo hacer un rol de juegos para liga de fútbol (sin conflictos)',
    description:
      'Aprende a crear un rol de juegos claro y operable: formato, horarios, canchas, reglas de reprogramación y checklist semanal.',
    keyword: 'cómo hacer un rol de juegos para liga de fútbol',
    readTime: '9 min de lectura',
    publishedAt: '26 de febrero de 2026',
    heroImage: '/images/functionalities/blogs/como-hacer-rol-de-juegos-liga-futbol/hero.webp',
  },
  {
    slug: BLOG_MEJORES_APPS_SLUG,
    title: 'Mejores apps para administrar torneos de fútbol [2026]',
    description:
      'Comparativa práctica de apps para gestionar torneos de fútbol. Qué evaluar, errores comunes y cuándo conviene migrar de Excel.',
    keyword: 'mejores apps para administrar torneos de fútbol',
    readTime: '8 min de lectura',
    publishedAt: '26 de febrero de 2026',
    heroImage: '/images/functionalities/blogs/mejores-apps-para-administrar-torneos-futbol-2026/hero.webp',
  },
  {
    slug: BLOG_ORGANIZAR_LIGA_SLUG,
    title: 'Cómo organizar una liga de fútbol amateur paso a paso (guía 2026)',
    description:
      'Guía práctica para organizar una liga amateur: formato, reglas, calendario, registro de equipos y operación semanal sin caos.',
    keyword: 'cómo organizar una liga de fútbol amateur',
    readTime: '10 min de lectura',
    publishedAt: '26 de febrero de 2026',
    heroImage: '/images/functionalities/blogs/como-organizar-liga-futbol-amateur/hero.webp',
  },
]

const hubTitle = 'Blog Futzo para administradores de ligas y torneos de fútbol'
const hubDescription =
  'Guías operativas, checklists y buenas prácticas para organizar torneos, programar jornadas y operar ligas sin caos.'

export const useBlogPosts = () => ({
  hubTitle,
  hubDescription,
  blogPosts,
  featuredPost: blogPosts[0],
})
