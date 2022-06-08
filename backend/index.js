const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3001
const route = require('./routes/students.route')
const path = require('path')


app.use(morgan('combined'))
route(app)
app.use(express.static(path.join(__dirname,'upload')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})