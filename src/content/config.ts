import { defineCollection, z } from 'astro:content';

const biblioteca = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(['PDF', 'Enlace', 'Actividad', 'Lectura']),
    publico: z.enum(['Estudiantes', 'Docentes', 'General']),
    descripcion: z.string(),
    enlace: z.string().optional(),
    archivo: z.string().optional()
  })
});

const aula = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    autor: z.string(),
    fecha: z.coerce.date(),
    categoria: z.string(),
    imagen: z.string().optional()
  })
});

const institucion = defineCollection({
  type: 'content',
  schema: z.object({
    resumen: z.string(),
    mision: z.string(),
    vision: z.string(),
    foto: z.string().optional()
  })
});

const episodios_extra = defineCollection({
  type: 'content',
  schema: z.object({
    slug_episodio: z.string(),
    transcripcion: z.string().optional(),
    recursos: z.array(z.object({ titulo: z.string(), enlace: z.string() })).optional()
  })
});

export const collections = { biblioteca, aula, institucion, episodios_extra };
