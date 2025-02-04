const router = require('express').Router()
const ac = require('../controller/auth.controller')
const rv = require('../validation/reg.validation')
const lv = require('../validation/log.validation')

router.post('/register', rv, ac.register)
router.post('/login', lv, ac.login)

module.exports = router
