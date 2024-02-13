const mongoose = require('mongoose')
const colors = require('colors')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log(colors.rainbow('Connect mongoDB...')))
  .catch((err) => console.error('Error Connection Fail', err))

const genresSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
})

const Genres = mongoose.model('Genres', genresSchema)

const Genres = new Course({
  name: 'node.js genres',
  author: 'arswe',
  tag: ['node', 'backend'],
})
