const express = require('express')
const router = express.Router()
const writeDataCategory = require('./seed')
const getAllCategories = require('./controller')

router.get('/api/country', getAllCategories)
writeDataCategory()

module.exports = router