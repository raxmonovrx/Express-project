const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const pathData = './data/users.json'
if (!fs.existsSync(pathData)) fs.writeFileSync(pathData, JSON.stringify([]))

const users = JSON.parse(fs.readFileSync(pathData))

class AuthController {
	async register(req, res) {
		const { name, email, password } = req.body

		if (users.find(u => u.email === email))
			return res.status(400).json({ message: 'Email already exists!' })

		const hashedPassword = await bcrypt.hash(password, 10)

		// **Role**ni server tomonidan belgilash
		// Adminni tekshirib, faqat admin bo‘lgan foydalanuvchilarga "admin" rolini belgilaymiz.
		let role = 'user'
		if (req.body.isAdmin) {
			// Agar user requestda `isAdmin: true` yuborsa, role admin bo‘lishi mumkin
			role = 'admin'
		}

		// Yangi user yaratish
		const newUser = {
			id: users.length + 1,
			name,
			email,
			password: hashedPassword,
			role,
		}
		users.push(newUser)

		fs.writeFileSync(pathData, JSON.stringify(users))

		res.status(201).json({ message: 'User registered successfully!' })
	}

	// 🔑 Login qilish (token olish)
	async login(req, res) {
		const { email, password } = req.body

		const user = users.find(u => u.email === email)
		if (!user) return res.status(400).json({ message: 'User not found!' })

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch)
			return res
				.status(400)
				.json({ message: 'Email or password is incorrect!' })

		// JWT Token yaratish
		const token = jwt.sign(
			{ id: user.id, name: user.name, role: user.role },
			'secret_key',
			{
				expiresIn: '1h',
			}
		)

		res.json({ message: 'Login successful!', token })
	}
}

module.exports = new AuthController()
