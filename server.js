const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080
const cors = require('cors')
const router = require('./router')

// ==================================================
app.use(express.json())
app.use(router)
app.use(cors())

// ==================================================
// Home route
app.get('/', (req, res) => {
	res.send('Hello World')
})

// ==================================================
app.use((req, res) => res.status(404).send('Page not found'))

app.listen(process.env.PORT, () =>
	console.log(`Server is running on port ${port}`)
)

/**
 * Barcha maxsulotlari korsatish
 * Masxulot add qilsh
 * Masulotni update qilish
 * Maxsulotni delete qilish
 * Maxsulot turlari boyicha qidirish query orqali ||=> products?price=10-100&&category=food
 * Maxsulot narxi eng baland va eng pasti boyicha ||=> products?price=10-100 o'sish tartibi bilan beradi
 *
 * Validation qo'shish
 * Cheklovlar qo'shish validatsia orqali
 * Har bitta so'rovni kim yuborganini aniqlash
 * Yangi data qo'shilganda uni kim qoshganini ham avtomatik yozib ketadigan qilish data.json fayliga
 * Auth da userni name va role ini qo'shish
 * Role lar bo'yicha cheklovlar qo'shish
 * Qachon qo'shilganligini ham qoshish data.json fayliga
 *
 */
