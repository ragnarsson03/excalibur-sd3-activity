import { Document } from 'mongoose';

export type ResourceTipo = 'Alimentos' | 'Medicina' | 'Material Educativo' | 'Equipos' | 'Otros';
export type ResourceEstado = 'Disponible' | 'Agotado' | 'En uso';

export interface IResource extends Document {
    nombre: string;
    tipo: ResourceTipo;
    cantidad: number;
    estado: ResourceEstado;
    createdAt?: Date;
    updatedAt?: Date;
}
