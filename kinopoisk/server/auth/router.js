const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signup,signIn,signout} = require('./controller')
const createAdmin = require('../admin/seed')


router.post('/api/signup', signup)
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/login?error=1'}), signIn)
router.get('/api/signout', signout)
createAdmin()

module.exports = router 