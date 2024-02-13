const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connect mongoDB...'))
  .catch((err) => console.error('Error Connection Fail', err))
