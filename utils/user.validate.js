const userValidation = (req, res, next) => {
	const { name, category, price, brand } = req.body
	req.body.name = req.body.name.trim()
	req.body.category = req.body.category.trim()
	req.body.brand = req.body.brand.trim()

	let errors = []
	const validCategories = ['food', 'technology', 'clothing']

	// Name validation
	if (!name) {
		errors.push({
			field: 'name',
			message: 'Name is required!',
		})
	} else if (typeof name !== 'string') {
		errors.push({
			field: 'name',
			message: 'Name must be a string!',
		})
	}

	// Category validation
	if (!category) {
		errors.push({
			field: 'category',
			message: 'Category is required!',
		})
	}

	if (!validCategories.includes(category)) {
		errors.push({
			field: 'category',
			message: `Category must be one of: ${validCategories.join(', ')}`,
		})
	}

	// Price validation
	if (price === undefined || price === null) {
		errors.push({
			field: 'price',
			message: 'Price is required.',
		})
	}
	if (typeof price !== 'number') {
		errors.push({
			ield: 'price',
			message: 'Price must be a number.',
		})
	}
	if (price <= 0) {
		errors.push({
			field: 'price',
			message: 'Price must be greater than 0.',
		})
	}

	// Brand validation
	if (!brand) {
		errors.push({
			field: 'brand',
			message: 'Brand is required!',
		})
	}

	if (typeof brand !== 'string') {
		errors.push({
			field: 'brand',
			message: 'Brand must be a string!',
		})
	}

	if (errors.length > 0) {
		return res.status(400).json({ status: 'error', errors })
	}

	next()
}

module.exports = userValidation
