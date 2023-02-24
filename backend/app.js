const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/', require('./routes/authUser'))
app.use('/api/v1/', require('./routes/category'))
app.use('/api/v1/', require('./routes/product'))

app.use(errorMiddleware)

module.exports = app;