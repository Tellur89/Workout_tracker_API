require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT;

// CONNECT TO DB
mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		app.listen(PORT || 3000, () => {
			console.log(`DB connected & server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
