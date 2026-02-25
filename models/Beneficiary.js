const mongoose = require('mongoose');

const BeneficiarySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    cedula: {
        type: String,
        required: [true, 'La cédula es obligatoria'],
        unique: true,
        trim: true
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Beneficiary', BeneficiarySchema);
