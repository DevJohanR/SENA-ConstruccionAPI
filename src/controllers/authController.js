const User = require('../models/User');
// Importamos el modelo User, que contiene los métodos para interactuar con la base de datos de usuarios.
// Este modelo se usa para registrar nuevos usuarios y buscar usuarios existentes durante el proceso de autenticación.

const bcrypt = require('bcrypt');
// Importamos bcrypt, una biblioteca para el hashing de contraseñas. 
// bcrypt es esencial para proteger las contraseñas antes de almacenarlas en la base de datos, 
// y para compararlas de manera segura durante la autenticación.

const authController = {
    // Método para registrar un nuevo usuario.
    register: async (req, res) => {
        const { username, password } = req.body;
        // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud (req.body).
        
        const hashedPassword = await bcrypt.hash(password, 10);
        // Ciframos la contraseña proporcionada usando bcrypt. 
        // El segundo argumento es el número de saltos (rounds) para generar el hash, lo que determina su complejidad y seguridad.
        
        const userId = await User.create(username, hashedPassword);
        // Usamos el modelo User para crear un nuevo registro en la base de datos con el nombre de usuario y la contraseña cifrada.
        // El método create devuelve el ID del nuevo usuario creado.

        res.status(201).json({ message: 'Usuario registrado', userId });
        // Respondemos al cliente con un código de estado 201 (Created) y un mensaje de confirmación junto con el ID del usuario registrado.
    },

    // Método para iniciar sesión.
    login: async (req, res) => {
        const { username, password } = req.body;
        // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud (req.body).

        const user = await User.findByUsername(username);
        // Buscamos en la base de datos si existe un usuario con el nombre de usuario proporcionado.
        // Si el usuario no existe, el método findByUsername devolverá undefined.

        if (!user) {
            // Si el usuario no existe, respondemos con un código de estado 401 (Unauthorized) y un mensaje de error.
            return res.status(401).json({ message: 'Error en la autenticación' });
        }

        const match = await bcrypt.compare(password, user.password);
        // Si el usuario existe, comparamos la contraseña proporcionada con la contraseña cifrada almacenada en la base de datos.
        // bcrypt.compare se encarga de realizar esta comparación de manera segura.

        if (match) {
            // Si las contraseñas coinciden, la autenticación es satisfactoria.
            res.status(200).json({ message: 'Autenticación satisfactoria' });
            // Respondemos con un código de estado 200 (OK) y un mensaje de éxito.
        } else {
            // Si las contraseñas no coinciden, respondemos con un código de estado 401 (Unauthorized) y un mensaje de error.
            res.status(401).json({ message: 'Error en la autenticación' });
        }
    }
};

module.exports = authController;
// Exportamos el objeto authController para que pueda ser utilizado en otras partes de la aplicación, 
// especialmente en las rutas donde se manejan las solicitudes de registro e inicio de sesión.
