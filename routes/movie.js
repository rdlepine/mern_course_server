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

router.get('/:id', getMovie, (req, res) => {

    res.json(res.movie)

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

router.delete('/:id', getMovie, async (req, res) => {
    
    try {
        await res.movie.remove()
        res.json({message: 'Movie Deleted.'})
    } catch (err) {
        res.status(500).json({message: 'Coulnd not find movie'})
    }

})

router.patch('/:id', getMovie, async (req, res) => {

    if(req.body.movieTitle !== null) {
        res.movie.movieTitle = req.body.movieTitle
    }

    if(req.body.movieDirector !== null) {
        res.movie.movieDirector = req.body.movieDirector
    }

    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Movie not updated'})
    }
})


async function getMovie(req, res, next) {
    let movie 
    try {
        movie = await Movie.findById(req.params.id)
        if(movie === null) {
            return res.status(404).json({message: "Movie not found"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Server Error"})
    }

    res.movie = movie
    next()
}

module.exports = router
