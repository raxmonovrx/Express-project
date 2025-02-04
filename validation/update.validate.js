const updateValidation = (req, res, next) => {
	const { name, category, price, brand } = req.body
	let errors = []
	const validCategories = ['food', 'technology', 'clothing']

	// Name validation for update (only if provided)
	if (name !== undefined) {
		if (name.trim() === '') {
			errors.push({
				field: 'name',
				message: 'Name must be non-empty string!',
			})
		} else if (typeof name !== 'string') {
			errors.push({
				field: 'name',
				message: 'Name must be a string!',
			})
		}
	}

	// Category validation for update (only if provided)
	if (category !== undefined) {
		if (category.trim() === '') {
			errors.push({
				field: 'category',
				message: 'Category must be non-empty string!',
			})
		} else if (!validCategories.includes(category)) {
			errors.push({
				field: 'category',
				message: `Category must be one of: ${validCategories.join(', ')}`,
			})
		}
	}

	// Price validation for update (only if provided)
	if (price !== undefined) {
		if (price === null || price === undefined) {
			errors.push({
				field: 'price',
				message: 'Price is required.',
			})
		} else if (typeof price !== 'number') {
			errors.push({
				field: 'price',
				message: 'Price must be a number.',
			})
		} else if (price <= 0) {
			errors.push({
				field: 'price',
				message: 'Price must be greater than 0.',
			})
		}
	}

	// Brand validation for update (only if provided)
	if (brand !== undefined) {
		if (brand.trim() === '') {
			errors.push({
				field: 'brand',
				message: 'Brand must be non-empty string!',
			})
		} else if (typeof brand !== 'string') {
			errors.push({
				field: 'brand',
				message: 'Brand must be a string!',
			})
		}
	}

	// If errors exist, return them
	if (errors.length > 0) {
		return res.status(400).json({ status: 'error', errors })
	}

	next()
}

module.exports = updateValidation
