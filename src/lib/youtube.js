// Consulta la playlist de YouTube definida en las variables de entorno
// y devuelve una lista de episodios ya lista para usar en las páginas.
// La clave (YOUTUBE_API_KEY) nunca se expone al navegador: esta función
// solo corre en el momento de generar el sitio (build time).

const API_KEY = import.meta.env.YOUTUBE_API_KEY;
const PLAYLIST_ID = import.meta.env.YOUTUBE_PLAYLIST_ID;

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getEpisodes() {
  if (!API_KEY || !PLAYLIST_ID) {
    // Sin credenciales configuradas: devuelve episodios de ejemplo (demo)
    // para que el sitio se pueda ver y construir aunque YouTube no esté conectado todavía.
    return [
      {
        slug: 'episodio-01-demo',
        title: '¿Cómo aprendemos cuando enseñamos? (demo)',
        thumbnail: 'https://placehold.co/640x360?text=Episodio+demo',
        videoId: '',
        publishedAt: new Date().toISOString(),
        description: 'Contenido de ejemplo. Conecta tu YOUTUBE_API_KEY y YOUTUBE_PLAYLIST_ID para ver tus episodios reales aquí.'
      }
    ];
  }

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`No se pudo consultar la playlist de YouTube (${res.status})`);
  }
  const data = await res.json();

  return data.items.map((item) => {
    const s = item.snippet;
    return {
      slug: slugify(s.title),
      title: s.title,
      thumbnail: s.thumbnails?.high?.url || s.thumbnails?.default?.url,
      videoId: s.resourceId.videoId,
      publishedAt: s.publishedAt,
      description: s.description || ''
    };
  });
}

export async function getEpisodeBySlug(slug) {
  const episodes = await getEpisodes();
  return episodes.find((ep) => ep.slug === slug) || null;
}
