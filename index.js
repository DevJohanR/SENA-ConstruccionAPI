const express = require('express'); // Importamos Express, un framework minimalista para crear aplicaciones web en Node.js.
const morgan = require('morgan'); // Importamos Morgan, un middleware para registrar peticiones HTTP en el servidor.
const authRoutes = require('./src/routes/authRoutes.js'); // Importamos las rutas de autenticación que hemos definido en authRoutes.js.

const app = express(); // Inicializamos una aplicación de Express.

// Middleware para registrar detalles de cada petición HTTP (método, ruta, tiempo de respuesta, etc.).
app.use(morgan('dev'));

// Middleware para que Express pueda interpretar cuerpos de peticiones en formato JSON.
app.use(express.json());

// Definimos la ruta base para las rutas de autenticación.
// Todas las rutas dentro de authRoutes estarán precedidas por /api/auth.
// Por ejemplo, /api/auth/register para registrar usuarios y /api/auth/login para iniciar sesión.
app.use('/api/auth', authRoutes);

// Iniciamos el servidor en el puerto 3000 y mostramos un mensaje en la consola cuando esté en funcionamiento.
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
