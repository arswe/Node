const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const Joi = require('joi')
const app = express()

app.use(express.json())
dotenv.config()
const port = process.env.PORT || 8000

const genres = [
  { id: 1, title: 'action' },
  { id: 2, title: 'Honor' },
  { id: 3, title: 'Romance' },
]

app.get('/', (req, res) => {
  res.send('Hello Genre CRUD!')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not found')

  res.send(genre)
})

app.post('/api/genres', (req, res) => {
  const { error } = validateGenres(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  genre = { id: genres.length + 1, title: req.body.title }
  genres.push(genre)
  res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not found')

  const { error } = validateGenres(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  genre.title = req.body.title
  res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not found')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genre)
})

function validateGenres(genre) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
  })

  return schema.validate(genre)
}

app.listen(port, () => {
  console.log(
    colors.rainbow(
      `Server is running on port http://localhost:${process.env.PORT}`
    )
  )
})