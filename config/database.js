const mongoose = require('mongoose');

// ── Cache de conexión para entornos serverless (Vercel) ─────────────────────
// En serverless, cada invocación puede reutilizar el mismo proceso.
// Cachear la conexión evita abrir múltiples conexiones a MongoDB.
let isConnected = false;

/**
 * Establece la conexión con MongoDB Atlas.
 * - Valida que MONGODB_URI esté definida.
 * - En entornos serverless, reutiliza la conexión existente si ya está activa.
 * - Termina el proceso con código 1 si la conexión falla (solo en entorno local).
 */
const connectDB = async () => {
    // ── Reutilizar conexión existente (optimización serverless) ────────────
    if (isConnected) {
        console.log('♻️  Reusing existing MongoDB connection');
        return;
    }

    const uri = process.env.MONGODB_URI;

    // ── Validación temprana: falla descriptiva si falta la variable ────────
    if (!uri) {
        const msg =
            '❌ [config/database.js] MONGODB_URI is not defined.\n' +
            '   • Local:   Add MONGODB_URI to your .env file\n' +
            '   • Vercel:  Add MONGODB_URI in Project → Settings → Environment Variables';
        throw new Error(msg);
    }

    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Timeout rápido si Atlas no responde
        });

        isConnected = true;
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);

        // En producción serverless lanzamos el error (no usamos process.exit).
        // En local sí terminamos el proceso para avisar al desarrollador.
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw error;
    }
};

module.exports = connectDB;
