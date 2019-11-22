const express = require('express')
const Movie = require('../models/movie.js')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch(err) {
        res.send(400).json({err:err})
    }
})

router.get('/:id', async (req, res) => {

        try {
            const movies = await Movie.find()
            res.json(movies)
        } catch(err) {
            res.send(400).json({err:err})
        }

})

router.post('/', async (req, res) => {
    const movie = new Movie ({
        movieDirector: req.body.movieDirector,
        movieTitle: req.body.movieTitle,
    })

    try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)

    } catch (err) {
        res.status(400).json({err: err})   
    }
})
module.exports = router
