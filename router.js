const rt = require('express').Router()
const pc = require('./controller/product.controller')

rt.get('/products', pc.getAll)
rt.get('/products/:id', pc.getById)
rt.post('/add/product', pc.addProduct)
rt.patch('/update/product', pc.updateProduct)
rt.delete('/delete/product', pc.deleteProduct)

module.exports = rt
