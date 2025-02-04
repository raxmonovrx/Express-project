const userValidation = (req, res, next) => {
	const { name, category, price, brand } = req.body

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
	} else if (name.length < 3 || name.length > 30) {
		errors.push({
			field: 'name',
			message: 'Name must be more than 3 and less than 30 characters!',
		})
	}

	// Category validation
	if (!category) {
		errors.push({
			field: 'category',
			message: 'Category is required!',
		})
	} else if (!validCategories.includes(category)) {
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
	} else if (typeof price !== 'number') {
		errors.push({
			ield: 'price',
			message: 'Price must be a number.',
		})
	} else if (price <= 0) {
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
	} else if (typeof brand !== 'string' || brand.trim() === '') {
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
