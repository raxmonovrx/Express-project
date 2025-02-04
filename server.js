const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080
const cors = require('cors')
const responseTime = require('response-time')
const router = require('./routes/project.routes')
const authRoutes = require('./routes/auth.routes')
const reqInfo = require('./middleware/req.info')
const {
	authMiddleware,
	adminMiddleware,
} = require('./middleware/auth.middleware')

app.use(express.json())
app.use(cors(), responseTime(), reqInfo)

app.use(router)

app.use('/auth', authRoutes)

app.get('/profile', authMiddleware, (req, res) => {
	res.json({ message: 'Profile Page', user: req.user })
})

app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
	res.json({ message: 'Welcome Admin!' })
})

app.get('/', (req, res) => {
	res.send('hello')
})

app.use((req, res) => res.status(404).send('Page not found'))

app.listen(process.env.PORT, () =>
	console.log(`Server is running on port ${port}`)
)

/**
 * 1. **Maxsulotlar bilan ishlash:**
 *    - Barcha maxsulotlarni ko'rsatish
 *    - Maxsulot qo'shish
 *    - Maxsulotni yangilash
 *    - Maxsulotni o'chirish
 *    - Maxsulot turlari bo'yicha qidirish (query orqali)
 *    - Maxsulot narxi eng baland va eng pastiga qarab qidirish (query orqali o'sish tartibida)
 *
 * 2. **Validation qo'shish:**
 *    - Foydalanuvchi ma'lumotlarini tekshirish (masalan, registerda validatsiya qilish)
 *    - Maxsulotlar uchun validatsiya qo'shish (masalan, price, name, category)
 *
 * 3. **Cheklovlar qo'shish:**
 *    - Har bitta so'rovni kim yuborganini aniqlash (authMiddleware orqali)
 *    - Yangi data qo'shilganda uni kim qo'shganini yozib ketish (admin yoki oddiy user)
 *
 * 4. **Data.json faylga yozib ketish:**
 *    - Maxsulotlar qo'shishda admin ismini va qachon qo'shilganini yozib ketish
 *    - Data faylga yangi maxsulot qo'shilganda foydalanuvchi haqida ma'lumotni qo'shish (adminName, createdAt)
 *
 * 5. **Auth da userni name va role ini qo'shish:**
 *
 * 6. **Role lar bo'yicha cheklovlar qo'shish:**
 *    - Adminlar uchun maxsus cheklovlar (adminMiddleware orqali)
 *    - Oddiy foydalanuvchilar uchun cheklovlar (user role)
 */
