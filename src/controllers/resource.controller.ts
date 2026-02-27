import { Request, Response } from 'express';
import Resource from '../models/Resource';

// READ - Get all resources
export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const resources = await Resource.find().sort({ nombre: 1 });
        res.render('recursos/index', { recursos: resources });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).render('500', { message: 'Error loading resources' });
    }
};

// CREATE - Show create form
export const showCreateForm = (_req: Request, res: Response): void => {
    res.render('recursos/crear', { error: null, datos: {} });
};

// CREATE - Process new resource
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, tipo, cantidad, estado } = req.body;
        await Resource.create({ nombre, tipo, cantidad, estado });
        res.redirect('/recursos');
    } catch (error) {
        console.error('Error creating resource:', error);
        res.render('recursos/crear', {
            error: 'Error al guardar el recurso. Verifica los datos.',
            datos: req.body
        });
    }
};

// UPDATE - Show edit form
export const showEditForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) { res.status(404).render('404'); return; }
        res.render('recursos/editar', { recurso: resource });
    } catch (error) {
        console.error('Error fetching resource for edit:', error);
        res.status(500).render('500', { message: 'Error loading resource' });
    }
};

// UPDATE - Process update
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, tipo, cantidad, estado } = req.body;
        await Resource.findByIdAndUpdate(
            req.params.id,
            { nombre, tipo, cantidad, estado },
            { new: true, runValidators: true }
        );
        res.redirect('/recursos');
    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(500).render('500', { message: 'Error updating resource' });
    }
};

// DELETE - Remove resource
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.redirect('/recursos');
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).render('500', { message: 'Error deleting resource' });
    }
};
