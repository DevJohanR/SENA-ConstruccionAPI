const pool = require('../config/db.js'); 
// Importamos el pool de conexiones desde la configuración en db.js. 
// Este pool nos permite gestionar un conjunto de conexiones a la base de datos MySQL, 
// optimizando la eficiencia y evitando la sobrecarga que podría causar abrir y cerrar conexiones constantemente.

class User {
    // Método estático para encontrar un usuario por su nombre de usuario.
    // La palabra clave "static" significa que el método puede ser llamado directamente desde la clase, 
    // sin necesidad de crear una instancia de la misma.
    static async findByUsername(username) {
        // Ejecutamos una consulta SQL utilizando el método query del pool de conexiones.
        // Usamos la sintaxis de placeholders "?" para evitar inyecciones SQL, asegurándonos de que los valores
        // de las variables se escapen automáticamente.
        // La consulta busca un usuario con un nombre de usuario específico en la tabla "users".
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        
        // El resultado de la consulta es un array de filas. 
        // Como estamos buscando un usuario por su nombre de usuario (que debería ser único), 
        // nos interesa la primera fila (rows[0]), que corresponde al usuario encontrado (o undefined si no se encuentra).
        return rows[0];
    }

    // Método estático para crear un nuevo usuario en la base de datos.
    static async create(username, password) {
        // Ejecutamos una consulta SQL para insertar un nuevo usuario en la tabla "users".
        // De nuevo, utilizamos placeholders "?" para insertar de forma segura los valores de "username" y "password".
        const result = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        
        // La variable "result" contiene información sobre la operación realizada.
        // Aquí nos interesa el "insertId", que es el ID del nuevo registro creado en la tabla "users".
        return result[0].insertId;
    }
}

module.exports = User;
// Exportamos la clase User para que pueda ser utilizada en otras partes de la aplicación, 
// especialmente en los controladores donde se gestionan las solicitudes relacionadas con los usuarios.
