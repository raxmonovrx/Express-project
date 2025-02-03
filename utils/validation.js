const updateValidation = (req, res, next) => {
	const { name, category, price, brand } = req.body
	let errors = []
	const validCategories = ['food', 'technology', 'clothing']

	if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
		errors.push({ field: 'name', message: 'Name must be a non-empty string!' })
	}

	if (category !== undefined && !validCategories.includes(category)) {
		errors.push({
			field: 'category',
			message: 'Category must be one of: ' + validCategories.join(', '),
		})
	}

	if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
		errors.push({
			field: 'price',
			message: 'Price must be a number greater than 0.',
		})
	}

	if (
		brand !== undefined &&
		(typeof brand !== 'string' || brand.trim() === '')
	) {
		errors.push({
			field: 'brand',
			message: 'Brand must be a non-empty string!',
		})
	}

	if (errors.length > 0)
		return res.status(400).json({ status: 'error', errors })
	next()
}

module.exports = { updateValidation }
