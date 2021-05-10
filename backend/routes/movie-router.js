const express = require('express')

const MovieCtrl = require('../controllers/movie-ctrl')

const router = express.Router()

router.post('/Bisectionfx', MovieCtrl.createMovie)
router.put('Bisectionfx/:id', MovieCtrl.updateMovie)
router.delete('/Bisectionfx/:id', MovieCtrl.deleteMovie)
router.get('/Bisectionfx/:id', MovieCtrl.getMovieById)
router.get('/Bisectionfxs', MovieCtrl.getMovies)
module.exports = router
