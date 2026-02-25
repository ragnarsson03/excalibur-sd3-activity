import { Document } from 'mongoose';

export type ActivityArea = 'Salud' | 'Educación' | 'Cultura' | 'Deporte' | 'Social';

export interface IActivity extends Document {
    nombre: string;
    descripcion: string;
    fecha: Date;
    area: ActivityArea;
    lugar: string;
    createdAt?: Date;
    updatedAt?: Date;
}
