import mongoose, { Schema } from 'mongoose';
import { IResource } from '../interfaces/IResource';

const ResourceSchema: Schema = new Schema<IResource>({
    nombre: {
        type: String,
        required: [true, 'El nombre del recurso es obligatorio'],
        trim: true
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de recurso es obligatorio'],
        enum: ['Alimentos', 'Medicina', 'Material Educativo', 'Equipos', 'Otros']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [0, 'La cantidad no puede ser negativa']
    },
    estado: {
        type: String,
        enum: ['Disponible', 'Agotado', 'En uso'],
        default: 'Disponible'
    }
}, { timestamps: true });

export default mongoose.model<IResource>('Resource', ResourceSchema);
