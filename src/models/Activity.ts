import mongoose, { Schema } from 'mongoose';
import { IActivity } from '../interfaces/IActivity';

const ActivitySchema: Schema = new Schema<IActivity>({
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

export default mongoose.model<IActivity>('Activity', ActivitySchema);
