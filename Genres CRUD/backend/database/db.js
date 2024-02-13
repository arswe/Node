const mongoose = require('mongoose')
const colors = require('colors')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log(colors.rainbow('Connect mongoDB...')))
  .catch((err) => console.error('Error Connection Fail', err))

const genresSchema = new mongoose.Schema({
  name: { type: String, require: true },
  author: { type: String, require: true },
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
})

const Genres = mongoose.model('Genres', genresSchema)

async function createGenres() {
  const genres = new Genres({
    name: 'React genres',
    author: 'arswe',
    tags: ['React', 'Frontend'],
    isPublished: true,
  })
  const result = await genres.save()
  console.log(result)
}

// queary selector
async function getCourse() {
  const pageNumer = 2
  const pageSize = 10

  const genres = await Genres.find({ author: 'arswe', isPublished: true })
    .or([{ author: 'arswe' }, { isPublished: true }])
    .skip((pageNumer - 1) * pageSize)
    .limit(10)
    .sort({ name: 1 })
    .count()
  console.log(genres)
}

getCourse()
