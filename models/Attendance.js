const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    beneficiario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beneficiary',
        required: [true, 'El beneficiario es obligatorio']
    },
    actividad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: [true, 'La actividad es obligatoria']
    },
    fechaAsistencia: {
        type: Date,
        default: Date.now
    },
    observacion: {
        type: String,
        default: 'Sin observaciones',
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
