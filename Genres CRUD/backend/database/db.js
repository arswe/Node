const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => console.log('connect mongoDB'))
  .catch((err) => console.error('error', err))
