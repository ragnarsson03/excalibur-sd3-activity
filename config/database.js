const mongoose = require('mongoose');

/**
 * Establece la conexión con MongoDB Atlas.
 * Lanza un error descriptivo si la variable de entorno MONGODB_URI no está definida.
 */
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    // ── Validación temprana ─────────────────────────────────────────────────
    if (!uri) {
        throw new Error(
            '❌ [config/database.js] Falta la variable de entorno MONGODB_URI.\n' +
            '   Asegúrate de tener un archivo .env en la raíz del proyecto con:\n' +
            '   MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<dbname>'
        );
    }

    // ── Opciones recomendadas para producción ───────────────────────────────
    const options = {
        serverSelectionTimeoutMS: 5000, // Falla rápido si no hay conexión
    };

    try {
        const conn = await mongoose.connect(uri, options);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Detiene el servidor si no puede conectar
    }
};

module.exports = connectDB;
