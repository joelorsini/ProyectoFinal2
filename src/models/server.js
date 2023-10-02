const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
	constructor() {
		this.port = process.env.PORT || 3000;
		this.app = express();
		this.paths = {
			users: '/api/users',
		};

		this.connectDB();

		this.middlewares();

		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	connectDB() {
		dbConnection();
	}

	routes() {
		this.app.use(this.paths.users, require('../routes/userRoutes'));
		this.app.use(this.paths.users, require('../routes/adminRoutes'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Server running on port', this.port);
		});
	}
}

module.exports = Server;