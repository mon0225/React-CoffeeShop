const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')
const express      = require('express')
const favicon      = require('serve-favicon')
const mongoose     = require('mongoose')
const logger       = require('morgan')
const path         = require('path')

// Keys sirve para configurar nuestras variables de entorno, dependiendo
// si estamos en desarrollo o en producción.
const keys         = require('./config/keys')
// Cors nos permite comunicar cosas del servidor del backend al del front
const cors = require('cors')

mongoose.Promise = Promise
mongoose
  .connect(keys.DB, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  })


const app = express()

//aquí usamos cors como middleware
app.use(cors())
// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const index = require('./routes/index')
const coffeeRoutes = require('./routes/coffeeRoutes')
app.use('/', index)
app.use('/api', coffeeRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`listen on  ${PORT}`))

module.exports = app

/* IMPORTANTE NOTA QUE HAY UNA CARPETA CLIENT, FUÉ GENERADA CON 
 CREATE-REACT-APP (SIGNIFICA QUE AHÍ DENTRO ESTÁ EL FRONTEND)
 LA RAZÓN ES PODER EJECUTAR CON  UNA HERRAMIENTA LOS 2 SERVERS
 EN PARALELO CON 'CONCURRENTLY' REVISA EN EL PACKAGE-JSON SU USO */