const API_KEY = (req, res, next) => {
	if (req.query.API_KEY === process.env.API_KEY) {
		next();
	} else {
		return res.status(400).json({ msg: 'Invalid Api Key' });
	}
};

export default API_KEY;
