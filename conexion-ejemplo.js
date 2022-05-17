const mysql = require('mysql');

const conexion = mysql.createConnection({
	host: 'localhost',
	database: 'db',
	user: 'user',
	password: 'password'
});



conexion.connect(function(error){
	if(error){
		throw error;
	} else {
		console.log('CONEXION EXITOSA');
	}
});

module.exports = conexion;