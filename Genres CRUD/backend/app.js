const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const Joi = require('joi')
const logger = require('./middlewares/logger')
const genreRoutes = require('./routes/genreRoutes')
const homeRoutes = require('./routes/homeRoutes')

const app = express()

// middleware function
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

// config
dotenv.config()

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
}

app.use(logger)

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

app.get('/', homeRoutes)

app.use('/api/courses', genreRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(
    colors.rainbow(
      `Server is running on port http://localhost:${process.env.PORT}`
    )
  )
})
