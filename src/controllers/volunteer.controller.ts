import { Request, Response } from 'express';
import Volunteer from '../models/Volunteer';

// READ - Get all volunteers
export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const volunteers = await Volunteer.find().sort({ apellido: 1 });
        res.render('voluntarios/index', { voluntarios: volunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).render('500', { message: 'Error loading volunteers' });
    }
};

// CREATE - Show create form
export const showCreateForm = (_req: Request, res: Response): void => {
    res.render('voluntarios/crear', { error: null, datos: {} });
};

// CREATE - Process new volunteer
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, cedula, telefono, profesion, disponibilidad } = req.body;
        await Volunteer.create({ nombre, apellido, cedula, telefono, profesion, disponibilidad });
        res.redirect('/voluntarios');
    } catch (error) {
        console.error('Error creating volunteer:', error);
        res.render('voluntarios/crear', {
            error: 'Error al guardar. Verifica los datos o cédula duplicada.',
            datos: req.body
        });
    }
};

// UPDATE - Show edit form
export const showEditForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) { res.status(404).render('404'); return; }
        res.render('voluntarios/editar', { voluntario: volunteer });
    } catch (error) {
        console.error('Error fetching volunteer for edit:', error);
        res.status(500).render('500', { message: 'Error loading volunteer' });
    }
};

// UPDATE - Process update
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, cedula, telefono, profesion, disponibilidad } = req.body;
        await Volunteer.findByIdAndUpdate(
            req.params.id,
            { nombre, apellido, cedula, telefono, profesion, disponibilidad },
            { new: true, runValidators: true }
        );
        res.redirect('/voluntarios');
    } catch (error) {
        console.error('Error updating volunteer:', error);
        res.status(500).render('500', { message: 'Error updating volunteer' });
    }
};

// DELETE - Remove volunteer
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await Volunteer.findByIdAndDelete(req.params.id);
        res.redirect('/voluntarios');
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).render('500', { message: 'Error deleting volunteer' });
    }
};
