const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const app = express()
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

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.post('/api/courses', (req, res) => {
  
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))

  if (!course) res.status(404).send('The course and the given id not correct')

  res.send(course)
})

app.listen(port, () => {
  console.log(
    colors.rainbow(
      `Server is running on port http://localhost:${process.env.PORT}`
    )
  )
})
