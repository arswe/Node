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
  const genres = await Genres.find({ author: 'arswe', isPublished: true })
    .or([{ author: 'arswe' }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(genres)
}

getCourse()
