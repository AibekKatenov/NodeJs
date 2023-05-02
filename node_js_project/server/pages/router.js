const express = require('express')
const router = express.Router()
const categories = require('../category/category')

router.get('/', async(req, res) => {
    const data = await categories.find()
    res.render('index', {user: req.user ? req.user : {}, category: data})
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
router.get('/new', async(req, res) => {
    const data = await categories.find()
    res.render('newBlog', {user: req.user ? req.user : {}, category: data})
})

module.exports = router