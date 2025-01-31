const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())
const port = process.env.PORT || 8080
const fs = require('fs')
const cors = require('cors')
const crypto = require('crypto')
const { console } = require('inspector')
const { log } = require('console')
// ==================================================

// Generate random id
const idCry = crypto.randomBytes(3).toString('hex')

// ==================================================
if (!fs.existsSync('data.json')) {
	fs.writeFileSync('data.json', JSON.stringify([]))
}
const data = JSON.parse(fs.readFileSync('data.json'))

// ==================================================
app.use(cors())

// ==================================================
// Home route
app.get('/', (req, res) => {
	res.send('Hello World')
})

// ==================================================
// Get all products
// !== Ishlamadi bu ==!
// app.get('/products', (req, res) => {
// 	const category = req.query.category
// 	const price = req.query.price

// 	if (!category || !price) {
// 		return res.send(data)
// 	}

// 	const from = Number(price.split('-').shift())
// 	const to = Number(price.split('-').pop())

// 	const filterPrice = data.filter(
// 		product => product.price >= from && product.price <= to
// 	)

// 	const products = data.filter(
// 		product => product.category.toLowerCase() === category.toLowerCase()
// 	)

// 	if (products.length === 0) {
// 		return res.status(404).json({
// 			status: 'error',
// 			message: 'Category not found',
// 		})
// 	}

// 	res.send(products || filterPrice)
// })
//  !== Ishlamadi ==!

// ==================================================
// * GPT azgina yordam berdi bunga. Aslida oddiy ekanu lekin qanday qilib bitta response ga ham category ham price ni send qilishni tushunmadim. Data ni bitta boshqa ozgaruvchiga yuklab olinsa boldikan.
app.get('/products', (req, res) => {
	const category = req.query.category
	const price = req.query.price

	let filteredProducts = data

	if (category) {
		filteredProducts = filteredProducts.filter(
			product => product.category.toLowerCase() === category.toLowerCase()
		)
	}
	if (price) {
		const from = Number(price.split('-').shift())
		const to = Number(price.split('-').pop())
		filteredProducts = filteredProducts.filter(
			product => product.price >= from && product.price <= to
		)
	}

	if (filteredProducts.length === 0) {
		return res.status(404).json({
			status: 'error',
			message: 'Products not found!',
		})
	}

	res.send(filteredProducts)
})
// ==================================================

// Search product by id
app.get('/products/:id', (req, res) => {
	const product = data.find(product => product.id === req.params.id)

	if (!product)
		return res.status(404).json({
			status: 'error',
			message: 'Product not found',
		})
	res.send(product)
})

// ==================================================
// Add new product
app.post('/add/product', (req, res) => {
	const { name, category, price, brand } = req.body
	if (!name || !category || !price || !brand)
		return res.status(400).json({
			status: 'error',
			message: 'Please provide all required fields',
		})

	const product = {
		id: idCry,
		name,
		category,
		price,
		brand,
	}

	data.push(product)
	fs.writeFileSync('data.json', JSON.stringify(data))
	res.status(201).send(product)
})

// ==================================================
// Update product
app.patch('/update/product/:id', (req, res) => {
	const { name, category, price, brand } = req.body
	const product = data.find(product => product.id === req.params.id)
	if (!product) return res.status(404).send('Product not found')

	index = data.indexOf(product)

	data.splice(index, 1, {
		id: product.id,
		name: name || product.name,
		category: category || product.category,
		price: price || product.price,
		brand: brand || product.brand,
	})

	fs.writeFileSync('data.json', JSON.stringify(data))
	res.send({
		status: 'success',
		message: 'Product updated successfully',
		data: product,
	})
})

// ==================================================
// Delete product
app.delete('/delete/product/:id', (req, res) => {
	const product = data.find(product => product.id === req.params.id)
	if (!product) return res.status(404).send('Product not found')

	index = data.indexOf(product)

	data.splice(index, 1)

	fs.writeFileSync('data.json', JSON.stringify(data))
	res.send({
		status: 'success',
		message: 'Product deleted successfully',
		data: product,
	})
})

// ==================================================
app.use((req, res) => res.status(404).send('Page not found'))

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${port}`)
})

/**
 * Barcha maxsulotlari korsatish
 * Masxulot add qilsh
 * Masulotni update qilish
 * Maxsulotni delete qilish
 * Maxsulot turlari boyicha qidirish query orqali ||=> products?price=10-100&&category=food
 * Maxsulot narxi eng baland va eng pasti boyicha ||=> products?price=10-100 o'sish tartibi bilan beradi
 */
