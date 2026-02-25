import mongoose, { Schema } from 'mongoose';
import { IAttendance } from '../interfaces/IAttendance';

const AttendanceSchema: Schema = new Schema<IAttendance>({
    beneficiario: {
        type: Schema.Types.ObjectId,
        ref: 'Beneficiary',
        required: [true, 'El beneficiario es obligatorio']
    },
    actividad: {
        type: Schema.Types.ObjectId,
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

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
