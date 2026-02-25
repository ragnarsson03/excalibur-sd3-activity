import { Document } from 'mongoose';

export type Disponibilidad = 'Fines de semana' | 'Días hábiles' | 'Tiempo completo' | 'Por evento';

export interface IVolunteer extends Document {
    nombre: string;
    apellido: string;
    cedula: string;
    telefono: string;
    profesion: string;
    disponibilidad: Disponibilidad;
    createdAt?: Date;
    updatedAt?: Date;
}
