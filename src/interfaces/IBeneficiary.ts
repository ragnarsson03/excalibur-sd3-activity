import { Document } from 'mongoose';

export interface IBeneficiary extends Document {
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: Date;
    direccion: string;
    telefono: string;
    createdAt?: Date;
    updatedAt?: Date;
}
