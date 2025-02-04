const rt = require('express').Router()
const usv = require('../validation/user.validate')
const upv = require('../validation/update.validate')

// Router for products
const pc = require('../controller/product.controller')
rt.get('/products', pc.getAll)
rt.get('/products/:id', pc.getById)
rt.post('/add/product', usv, pc.addProduct)
rt.patch('/update/product/:id', upv, pc.updateProduct)
rt.delete('/delete/product/:id', pc.deleteProduct)




module.exports = rt
