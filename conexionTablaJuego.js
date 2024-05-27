//Esta conexion nos permite conectarnos a la base de datos que contiene los juegos
//Es importante que los datos de conexion sean identicos a la BDD.
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'SteamLatam'
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;
