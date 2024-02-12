const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const Joi = require('joi')

const app = express()
app.use(express.json())
dotenv.config()
const port = process.env.PORT || 8000

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* Data */
app.get('/api/courses', (req, res) => {
  res.send(courses)
})

/* Details */
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course)
    return res.status(404).send('The course and the given id not correct')
  res.send(course)
})

/* CREATE */
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course)
  res.send(course)
})

/* @PUT */
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course)
    return res.status(404).send('The course and the given id not correct')

  const { error } = validateCourse(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  // update course
  course.name = req.body.name
  // Rerurn the update course
  res.send(course)
})

/* Delete */
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course)
    return res.status(404).send('The course with the given id was not found')

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
})
// validateCourse
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
  })

  return schema.validate(course)
}

app.listen(port, () => {
  console.log(
    colors.rainbow(
      `Server is running on port http://localhost:${process.env.PORT}`
    )
  )
})
