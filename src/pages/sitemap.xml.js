import { getEpisodes } from '../lib/youtube.js';

export async function GET() {
  const site = 'https://ensenando-aprendiendo.netlify.app';
  const episodios = await getEpisodes();

  const staticUrls = ['', '/podcast', '/biblioteca', '/aula'];
  const episodeUrls = episodios.map((e) => `/podcast/${e.slug}`);

  const urls = [...staticUrls, ...episodeUrls];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
