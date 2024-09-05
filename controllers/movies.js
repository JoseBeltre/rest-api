import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  static getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static getById = async (req, res) => { // path-to-regexp
    const { id } = req.params
    const movie = await MovieModel.getByID({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found ❌' })
  }

  static create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) })
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static delete = async (req, res) => {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (!result) return res.status(404).json({ message: 'Movie NOT found' })
    return res.json({ message: 'Movie deleted' })
  }

  static update = async (req, res) => {
    const result = validatePartialMovie(req.body)
    if (!result.success) return res.json(400).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }
}
