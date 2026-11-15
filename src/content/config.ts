import { defineCollection, z } from 'astro:content';

const biblioteca = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(['PDF', 'Enlace', 'Actividad', 'Lectura']),
    publico: z.enum(['Estudiantes', 'Docentes', 'General']),
    descripcion: z.string()
  })
});

const aula = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    autor: z.string(),
    fecha: z.date(),
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

export const collections = { biblioteca, aula, institucion };
