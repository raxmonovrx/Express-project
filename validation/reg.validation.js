const registerValidation = (req, res, next) => {
	const { name, email, password } = req.body

	let errors = []

	if (!name) {
		errors.push({
			field: 'name',
			message: 'name is required!',
		})
	}

	if (!email) {
		errors.push({
			field: 'email',
			message: 'email is required!',
		})
	}

	if (!password) {
		errors.push({
			field: 'password',
			message: 'password is required!',
		})
	}

	if (errors.length > 0) {
		return res.status(400).json({ status: 'error', errors })
	}

	next()
}
module.exports = registerValidation
