import 'dotenv/config';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/database';

// ── Routes ───────────────────────────────────────────────────────────────────
import beneficiaryRoutes from './routes/beneficiary.routes';
import activityRoutes from './routes/activity.routes';
import volunteerRoutes from './routes/volunteer.routes';
import resourceRoutes from './routes/resource.routes';
import attendanceRoutes from './routes/attendance.routes';

// ── Initialize Express ───────────────────────────────────────────────────────
const app = express();

// ── 1. Connect to MongoDB ────────────────────────────────────────────────────
connectDB();

// ── 2. View Engine (EJS) ─────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// ── 3. Middlewares ───────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── 4. Ruta de Diagnóstico — GRUPO EXCALIBUR ─────────────────────────────────
app.get('/debug-db', (_req, res) => {
    const estado = mongoose.connection.readyState;
    const estados: Record<number, string> = {
        0: 'Desconectado',
        1: 'Conectado',
        2: 'Conectando',
        3: 'Desconectando'
    };

    res.json({
        estado_conexion: estados[estado],
        uri_detectada: process.env.MONGODB_URI ? 'SÍ (configurada)' : 'NO (está undefined)',
        mensaje: "Si sale 'Conectando' y se queda pegado, es el Firewall de Atlas (IP 0.0.0.0/0)"
    });
});

// ── 5. Routes ────────────────────────────────────────────────────────────────
app.use('/beneficiarios', beneficiaryRoutes);
app.use('/actividades', activityRoutes);
app.use('/voluntarios', volunteerRoutes);
app.use('/recursos', resourceRoutes);
app.use('/asistencias', attendanceRoutes);

// ── 6. Home ──────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.render('index');
});

// ── 7. 404 Handler ───────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).render('404');
});

// ── 8. Start Server (solo en local, NO en Vercel serverless) ─────────────────
// Vercel importa este archivo como módulo; require.main === module es false allí.
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
}

// ── 9. Export app for Vercel serverless handler ──────────────────────────────
export default app;
