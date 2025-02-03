const fs = require('fs')
const pathData = './data/data.json'
const { v4: uuidv4 } = require('uuid')

if (!fs.existsSync(pathData)) {
	fs.writeFileSync(pathData, JSON.stringify([]))
}
const data = JSON.parse(fs.readFileSync(pathData))

class product {
	// get all products
	async getAll(req, res) {
		try {
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
		} catch (error) {
			console.log(error)
			res.status(500).json({
				status: 'error',
				message: 'Internal server error',
			})
		}
	}

	// get product by id
	async getById(req, res) {
		const product = data.find(product => product.id === req.params.id)

		if (!product)
			return res.status(404).json({
				status: 'error',
				message: 'Product not found',
			})
		res.send(product)
	}

	// add product
	async addProduct(req, res) {
		const { name, category, price, brand } = req.body

		const product = {
			id: uuidv4(),
			name,
			category,
			price,
			brand,
		}

		data.push(product)
		fs.writeFileSync(pathData, JSON.stringify(data))
		res.status(201).json({
			status: 'success',
			message: 'Product added successfully',
			data: product,
		})
	}

	// update product by id
	async updateProduct(req, res) {
		const { name, category, price, brand } = req.body
		const product = data.find(product => product.id === req.params.id)
		if (!product) return res.status(404).send('Product not found')

		const index = data.indexOf(product)

		const updatedProduct = {
			id: product.id,
			name: name || product.name,
			category: category || product.category,
			price: price || product.price,
			brand: brand || product.brand,
		}

		data[index] = updatedProduct

		fs.writeFileSync(pathData, JSON.stringify(data))

		res.send({
			status: 'success',
			message: 'Product updated successfully',
			data: updatedProduct,
		})
	}

	// delete product by id
	async deleteProduct(req, res) {
		const product = data.find(product => product.id === req.params.id)
		if (!product) return res.status(404).send('Product not found')

		index = data.indexOf(product)

		data.splice(index, 1)

		fs.writeFileSync(pathData, JSON.stringify(data))
		res.send({
			status: 'success',
			message: 'Product deleted successfully',
			data: product,
		})
	}
}

module.exports = new product()
