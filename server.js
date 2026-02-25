require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express
const app = express();

// Server Port
const PORT = process.env.PORT || 3000;

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// 2. Configure View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. Middlewares
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json());                          // Parse JSON
app.use(express.static(path.join(__dirname, 'public'))); // Static files (CSS, JS, images)

// 4. Import and use Routes
app.use('/beneficiarios', require('./routes/beneficiary.routes'));
app.use('/actividades', require('./routes/activity.routes'));
app.use('/voluntarios', require('./routes/volunteer.routes'));
app.use('/recursos', require('./routes/resource.routes'));
app.use('/asistencias', require('./routes/attendance.routes'));

// 5. Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).render('404');
});

// 7. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
