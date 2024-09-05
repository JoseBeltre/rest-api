import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().min(60).max(3600),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Sci-Fi', 'Action', 'Terror', 'Comedy', 'Adventure', 'Drama', 'Romance', 'Biography', 'Fantasy']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genres'
    })
    .min(1),
  rate: z.number().min(0).max(10).default(0)
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
