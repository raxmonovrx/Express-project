const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) return res.status(401).json({ message: 'Unauthorized' })

	try {
		const decoded = jwt.verify(token, 'secret_key')
		req.user = decoded // User ma'lumotlari (id, role)
		next()
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' })
	}
}

// 🛑 Faqat adminlar uchun middleware
const adminMiddleware = (req, res, next) => {
	if (req.user.role !== 'admin') {
		return res
			.status(403)
			.json({ message: 'Forbidden: Only admin can access this route' })
	}
	next()
}

module.exports = { authMiddleware, adminMiddleware }
