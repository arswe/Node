const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(
    colors.rainbow(
      `Server is running on port http://localhost:${process.env.PORT}`
    )
  )
})
