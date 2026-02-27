import { Request, Response } from 'express';
import Beneficiary from '../models/Beneficiary';

// READ - Get all beneficiaries
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
        res.render('beneficiarios/index', { beneficiarios: beneficiaries });
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).render('500', { message: 'Error loading beneficiaries' });
    }
};

// CREATE - Show create form
export const showCreateForm = (_req: Request, res: Response): void => {
    res.render('beneficiarios/crear', { error: null, datos: {} });
};

// CREATE - Process new beneficiary
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, cedula, fechaNacimiento, direccion, telefono } = req.body;
        await Beneficiary.create({ nombre, apellido, cedula, fechaNacimiento, direccion, telefono });
        res.redirect('/beneficiarios');
    } catch (error) {
        console.error('Error creating beneficiary:', error);
        res.render('beneficiarios/crear', {
            error: 'Error al guardar. Verifica los datos o cédula duplicada.',
            datos: req.body
        });
    }
};

// UPDATE - Show edit form
export const showEditForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id);
        if (!beneficiary) { res.status(404).render('404'); return; }
        res.render('beneficiarios/editar', { beneficiario: beneficiary });
    } catch (error) {
        console.error('Error fetching beneficiary for edit:', error);
        res.status(500).render('500', { message: 'Error loading beneficiary' });
    }
};

// UPDATE - Process update
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, cedula, fechaNacimiento, direccion, telefono } = req.body;
        await Beneficiary.findByIdAndUpdate(
            req.params.id,
            { nombre, apellido, cedula, fechaNacimiento, direccion, telefono },
            { new: true, runValidators: true }
        );
        res.redirect('/beneficiarios');
    } catch (error) {
        console.error('Error updating beneficiary:', error);
        res.status(500).render('500', { message: 'Error updating beneficiary' });
    }
};

// DELETE - Remove beneficiary
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await Beneficiary.findByIdAndDelete(req.params.id);
        res.redirect('/beneficiarios');
    } catch (error) {
        console.error('Error deleting beneficiary:', error);
        res.status(500).render('500', { message: 'Error deleting beneficiary' });
    }
};

// QUERY - Search beneficiaries by cedula or name
export const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const { q } = req.query as { q?: string };
        const query = q
            ? {
                $or: [
                    { cedula: { $regex: q, $options: 'i' } },
                    { nombre: { $regex: q, $options: 'i' } },
                    { apellido: { $regex: q, $options: 'i' } }
                ]
            }
            : {};
        const beneficiaries = await Beneficiary.find(query).sort({ apellido: 1 });
        res.render('beneficiarios/consulta', { beneficiarios: beneficiaries, q: q || '' });
    } catch (error) {
        console.error('Error in beneficiary search:', error);
        res.status(500).render('500', { message: 'Error in search' });
    }
};

// QUERY - Search by Cedula
export const searchByCedula = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cedula } = req.query;
        if (!cedula) {
            res.redirect('/beneficiarios');
            return;
        }
        const queryStr = (cedula as string).trim();
        // Permite la búsqueda parcial de números de cédula
        const beneficiaries = await Beneficiary.find({ cedula: { $regex: queryStr, $options: 'i' } });
        res.render('beneficiarios/index', {
            beneficiarios: beneficiaries,
            searchQuery: queryStr
        });
    } catch (error) {
        console.error('Error fetching beneficiary by cedula:', error);
        res.status(500).render('500', { message: 'Error loading beneficiaries' });
    }
};