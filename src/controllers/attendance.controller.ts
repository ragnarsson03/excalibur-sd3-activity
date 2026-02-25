import { Request, Response } from 'express';
import Attendance from '../models/Attendance';
import Beneficiary from '../models/Beneficiary';
import Activity from '../models/Activity';

// READ - Get all attendance records
export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const records = await Attendance.find()
            .populate('beneficiario', 'nombre apellido cedula')
            .populate('actividad', 'nombre fecha')
            .sort({ fechaAsistencia: -1 });
        res.render('asistencias/index', { asistencias: records });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).render('500', { message: 'Error loading attendance records' });
    }
};

// CREATE - Show create form (with dropdowns)
export const showCreateForm = async (_req: Request, res: Response): Promise<void> => {
    try {
        const [beneficiaries, activities] = await Promise.all([
            Beneficiary.find().sort({ apellido: 1 }),
            Activity.find().sort({ nombre: 1 })
        ]);
        res.render('asistencias/crear', {
            beneficiarios: beneficiaries,
            actividades: activities,
            error: null,
            datos: {}
        });
    } catch (error) {
        console.error('Error loading form data:', error);
        res.status(500).render('500', { message: 'Error loading form data' });
    }
};

// CREATE - Process new attendance record
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { beneficiario, actividad, fechaAsistencia, observacion } = req.body;
        await Attendance.create({ beneficiario, actividad, fechaAsistencia, observacion });
        res.redirect('/asistencias');
    } catch (error) {
        console.error('Error creating attendance record:', error);
        const [beneficiaries, activities] = await Promise.all([
            Beneficiary.find().sort({ apellido: 1 }),
            Activity.find().sort({ nombre: 1 })
        ]);
        res.render('asistencias/crear', {
            beneficiarios: beneficiaries,
            actividades: activities,
            error: 'Error al registrar asistencia. Verifica los datos.',
            datos: req.body
        });
    }
};

// UPDATE - Show edit form
export const showEditForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const [record, beneficiaries, activities] = await Promise.all([
            Attendance.findById(req.params.id),
            Beneficiary.find().sort({ apellido: 1 }),
            Activity.find().sort({ nombre: 1 })
        ]);
        if (!record) { res.status(404).render('404'); return; }
        res.render('asistencias/editar', {
            asistencia: record,
            beneficiarios: beneficiaries,
            actividades: activities
        });
    } catch (error) {
        console.error('Error fetching attendance record for edit:', error);
        res.status(500).render('500', { message: 'Error loading record' });
    }
};

// UPDATE - Process update
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { beneficiario, actividad, fechaAsistencia, observacion } = req.body;
        await Attendance.findByIdAndUpdate(
            req.params.id,
            { beneficiario, actividad, fechaAsistencia, observacion },
            { new: true, runValidators: true }
        );
        res.redirect('/asistencias');
    } catch (error) {
        console.error('Error updating attendance record:', error);
        res.status(500).render('500', { message: 'Error updating record' });
    }
};

// DELETE - Remove attendance record
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.redirect('/asistencias');
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).render('500', { message: 'Error deleting record' });
    }
};
