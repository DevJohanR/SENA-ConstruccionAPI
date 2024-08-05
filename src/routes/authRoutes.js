const express = require('express'); // Importamos Express para crear rutas y manejar peticiones HTTP.
const router = express.Router(); // Creamos una instancia del enrutador de Express para definir rutas de la API.
const authController = require('../controllers/authController.js'); // Importamos el controlador de autenticación que contiene la lógica de negocio para el registro e inicio de sesión.

// Ruta para registrar un nuevo usuario.
// Cuando se recibe una petición POST en /api/auth/register, se invoca la función register del controlador authController.
router.post('/register', authController.register);

// Ruta para iniciar sesión.
// Cuando se recibe una petición POST en /api/auth/login, se invoca la función login del controlador authController.
router.post('/login', authController.login);

module.exports = router; // Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
