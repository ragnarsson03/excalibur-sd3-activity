import mongoose, { Schema } from 'mongoose';
import { IVolunteer } from '../interfaces/IVolunteer';

const VolunteerSchema: Schema = new Schema<IVolunteer>({
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
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    profesion: {
        type: String,
        required: [true, 'La profesión u oficio es obligatoria'],
        trim: true
    },
    disponibilidad: {
        type: String,
        enum: ['Fines de semana', 'Días hábiles', 'Tiempo completo', 'Por evento'],
        default: 'Por evento'
    }
}, { timestamps: true });

export default mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
