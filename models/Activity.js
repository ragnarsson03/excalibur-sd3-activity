const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la actividad es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha de la actividad es obligatoria']
    },
    area: {
        type: String,
        required: [true, 'El área es obligatoria'],
        enum: ['Salud', 'Educación', 'Cultura', 'Deporte', 'Social']
    },
    lugar: {
        type: String,
        required: [true, 'El lugar es obligatorio'],
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
