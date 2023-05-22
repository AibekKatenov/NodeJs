const express = require('express')
const router = express.Router()
const categories = require('../category/category')
const Blogs = require('../blogs/blog')
const User = require('../auth/user')

router.get('/', async(req, res) => {
    const options = {}
    const categ = await categories.findOne({key: req.query.categ})
    if(categ){
        options.category = categ._id
        console.log(req.query.categ)
        res.locals.category = categ.key
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    const totalBlogs = await Blogs.count(options)
    const data = await categories.find()
    const data2 = await Blogs.find(options).limit(limit).skip(page * limit).populate('category').populate('author')
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render('index', {user, category: data, blog: data2, pages: Math.ceil(totalBlogs / limit)})
})

router.get('/profile/:id', async(req, res) => {
    const data = await Blogs.find().populate('category').populate('author')
    const user = await User.findById(req.params.id).populate('toRead')
    .populate({path: 'toRead', populate: {path: 'category'}})
    res.render('profile', {user: user ? user : {}, blog: data})
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
router.get('/edit/:id', async(req, res) => {
    const data = await categories.find()
    const blog = await Blogs.findById(req.params.id)
    res.render('edit', {user: req.user ? req.user : {}, category: data, blog: blog})
})

router.get('/detail/:id', async(req, res) => {
    const blog = await Blogs.findById(req.params.id).populate('category').populate('author')
    res.render('detail', {user: req.user ? req.user : {}, blog: blog})
})

module.exports = router