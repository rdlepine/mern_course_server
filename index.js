const express = require('express')
const cluster = require('cluster')
const mongoose = require('mongoose')
const validate = require('./validate')
const movieRouter = require('./routes/movie.js')
const os = require('os')
const clusterSize = os.cpus().length
const PORT = process.env.PORT | 3000
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/movies'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.once('open', () => console.log('Connected to database'))

let lessons = [
    { id:1, lesson:'lesson1'},
    { id:2, lesson:'lesson2'},
    { id:3, lesson:'lesson3'}
]

if(clusterSize > 1) {

    if (cluster.isMaster) {
        for (let i=0; i < clusterSize; i++) {
          cluster.fork()
        }
     
        cluster.on("exit", function(worker) {
          console.log("Worker", worker.id, " has exitted.")
        })

    } else {
    
        const app = express()
        app.use(express.json())
        app.use('/movies', movieRouter)

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
}