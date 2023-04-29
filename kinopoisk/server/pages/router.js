const express = require('express')
const router = express.Router()
const genres = require('../genres/genres')
const country = require('../country/country')
const User = require('../auth/user')

router.get('/', async(req, res) => {
    const allGenres = await genres.find()
    res.render('index', {genres: allGenres, user: req.user ? req.user : {}})
})
router.get('/login', (req,res) => {
    res.render('login', {user: req.user ? req.user : {}})
})

router.get('/register', (req,res) => {
    res.render('register', {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async(req,res) => {
    const allGenres = await genres.find();
    const user = await User.findById(req.params.id)
    if(user){
        res.render('profile', {user: user, genres: allGenres, loginUser: req.user})
    }else{
        res.redirect('/not-found')
    }
    
})

router.get('/admin/:id', async(req,res) => {
    const allGenres = await genres.find()
    const user = await User.findById(req.params.id)
    res.render('adminProfile', {user: req.user ? req.user : {}, genres: allGenres,})
})

router.get('/new', async(req,res) => {
    const allGenres = await genres.find();
    const allCountries = await country.find();
    res.render('newFilm', {genres: allGenres, country: allCountries, user: req.user ? req.user : {}})
})

router.get('/edit', async(req,res) => {
    const allGenres = await genres.find();
    const allCountries = await country.find();
    res.render('editFilm', {genres: allGenres, country: allCountries, user: req.user ? req.user : {}})
})

router.get('/not-found', (req,res) => {
    res.render('notFound')
})
module.exports = router  