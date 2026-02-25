require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/database');

// ── Initialize Express ──────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// ── 1. Connect to MongoDB (uses config/database.js with validation) ─────────
connectDB();

// ── 2. View Engine (EJS) ────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── 3. Middlewares ──────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json());                          // Parse JSON body
app.use(express.static(path.join(__dirname, 'public'))); // Static assets

// ── 4. Routes ───────────────────────────────────────────────────────────────
app.use('/beneficiarios', require('./routes/beneficiary.routes'));
app.use('/actividades', require('./routes/activity.routes'));
app.use('/voluntarios', require('./routes/volunteer.routes'));
app.use('/recursos', require('./routes/resource.routes'));
app.use('/asistencias', require('./routes/attendance.routes'));

// ── 5. Home ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.render('index');
});

// ── 6. 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404');
});

// ── 7. Start Server ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
