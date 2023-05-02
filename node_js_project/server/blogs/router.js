const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createBlog} = require('./controller')

router.post('/api/new', upload.single('image'), createBlog)

module.exports = router