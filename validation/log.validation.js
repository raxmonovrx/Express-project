const loginValidation = (req, res, next) => {
	const { email, password } = req.body

	let errors = []

	if (!email) {
		errors.push({
			field: 'email',
			message: 'Please add email!',
		})
	}

	if (!password) {
		errors.push({
			field: 'password',
			message: 'Please add password!',
		})
	}

	if (errors.length > 0) {
		return res.status(400).json({
			status: 'error',
			errors,
		})
	}
	next()
}
module.exports = loginValidation
