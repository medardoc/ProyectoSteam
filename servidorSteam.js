const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

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

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            connection.query(
                'SELECT * FROM usuarios WHERE username = ? AND password = ?',
                [username, password],
                (error, results) => {
                    if (error) {
                        console.error('Database error:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error interno del servidor' }));
                    } else if (results.length > 0) {
                        const token = jwt.sign({ username }, 'tu_secreto', { expiresIn: '1h' });
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Inicio de sesión exitoso', token }));
                    } else {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Credenciales inválidas' }));
                    }
                }
            );
        });
    } else if (pathname === '/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            connection.query(
                'INSERT INTO usuarios (username, password) VALUES (?, ?)',
                [username, password],
                (error, results) => {
                    if (error) {
                        console.error('Database error:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error interno del servidor' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Registro exitoso' }));
                    }
                }
            );
        });
    } else if (pathname === '/juegos' && req.method === 'GET') {
        // Aquí llamamos a la función para obtener los juegos de la base de datos
        connection.query('SELECT * FROM JuegosSteam', (error, results) => {
            if (error) {
                console.error('Database error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results));
            }
        });
    } else {
        let filePath = path.join(__dirname, pathname === '/' ? 'login.html' : pathname);

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.svg': 'application/image/svg+xml',
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.error('Error de lectura de archivo:', err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>El recurso solicitado no fue encontrado.</p>');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor Creado http://localhost:${port}`);
});
