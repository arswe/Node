const express = require('express')

const router = express.Router()

const genres = [
  { id: 1, title: 'action' },
  { id: 2, title: 'Honor' },
  { id: 3, title: 'Romance' },
]

router.get('/api/genres', (req, res) => {
  res.send(genres)
})

router.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not found')

  res.send(genre)
})

router.post('/api/genres', (req, res) => {
  const { error } = validateGenres(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  genre = { id: genres.length + 1, title: req.body.title }
  genres.push(genre)
  res.send(genre)
})

router.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not found')

  const { error } = validateGenres(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  genre.title = req.body.title
  res.send(genre)
})

router.delete('/api/genres/:id', (req, res) => {
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

module.exports = router
