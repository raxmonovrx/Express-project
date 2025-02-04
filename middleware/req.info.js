const { v4: uuidv4 } = require('uuid')

const reqInfo = (req, res, next) => {
	req.info = {
		id: uuidv4(),
		method: req.method,
		date: new Date().toUTCString(),
		time: new Date().toISOString(),
	}

	res.header('Request-id', req.info.id)
	res.header('Request-Date', req.info.date)
	res.header('Request-time', req.info.time)
	next()
}
module.exports = reqInfo
