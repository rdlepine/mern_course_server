const express = require('express')
const cluster = require('cluster')
const validate = require('./validate')
const os = require('os')
const clusterSize = os.cpus().length
const PORT = process.env.PORT | 3000

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

        app.get('/', (req, res) => res.send('Hello'))

        app.get('/api/lessons', (req, res) => res.send(lessons))


        app.get('/api/lessons/:id', (req, res) => {
            const lesson = lessons.find( (l) => l.id === parseInt(req.params.id))

            if(!lesson) res.status(404).send("The lesson ID was not found")

            res.send(lesson)
        })

        app.post('/api/lessons', (req, res) => {

            if(validate(req, res) === 1) return;
            
            const lesson = {
                id: lessons.length + 1,
                lesson: req.body.lesson
            }
            lessons.push(lesson)

            res.send(lesson)
        })

        app.put('/api/lessons/:id', (req, res) => {
        
            const lesson = lessons.find( (l) => l.id === parseInt(req.params.id))

            if(!lesson) {
                res.status(404).send("Lesson not found")
                return;
            }
            if(validate(req, res) === 1) return;
       
            lesson.lesson = req.body.lesson
       
            res.send(lesson)

        })

        app.delete('/api/lessons/:id', (req, res) => {
            const lesson = lessons.find( (l) => l.id === parseInt(req.params.id))

            if(!lesson) res.status(404).send("Lesson not found")

            const index = lessons.indexOf(lesson)
            lessons.splice(index, 1)
            res.send(lesson)
        })

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
}