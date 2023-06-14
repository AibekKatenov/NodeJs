const express = require('express')
const router = express.Router()
const {saveRate, deleteRate} = require('./controller')
const {isAuth, isAdmin} = require('../auth/middlewares')

router.post('/api/rate', saveRate )
router.delete('/api/delete/rate/:id', isAdmin, deleteRate)


module.exports = router