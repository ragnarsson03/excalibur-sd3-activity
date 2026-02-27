import { Document, Types } from 'mongoose';

export interface IAttendance extends Document {
    beneficiario: Types.ObjectId;
    actividad: Types.ObjectId;
    fechaAsistencia: Date;
    observacion: string;
    createdAt?: Date;
    updatedAt?: Date;
}
