const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const app = express()
require('dotenv').config()

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Importar rutas
app.use('/users',require('./routes/users'))

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})