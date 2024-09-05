import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234

app.use(json())
app.use(corsMiddleware())
// metodos normales: GET/HEAD/POST
// Metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

// Ahora para el endpoint 'movie', usaremos las rutas de 'movieRouter'
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
