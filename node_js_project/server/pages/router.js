const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {user: req.user ? req.user : {}})
})

router.get('/profile/:id', (req, res) => {
    res.render('profile', {user: req.user ? req.user : {}})
})

router.get('/login',(req, res) => {
    res.render('login', {user: req.user ? req.user : {}})
})

router.get('/register', (req,res) => {
    res.render('register', {user: req.user ? req.user : {}})
})

module.exports = router