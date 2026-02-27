import { Request, Response } from 'express';
import Activity from '../models/Activity';

const AREAS = ['Salud', 'Educación', 'Cultura', 'Deporte', 'Social'] as const;

// READ - Get all activities
export const getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const activities = await Activity.find().sort({ fecha: -1 });
        res.render('actividades/index', { actividades: activities });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).render('500', { message: 'Error loading activities' });
    }
};

// CREATE - Show create form
export const showCreateForm = (_req: Request, res: Response): void => {
    res.render('actividades/crear', { error: null, datos: {}, areas: AREAS });
};

// CREATE - Process new activity
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, descripcion, fecha, area, lugar } = req.body;
        await Activity.create({ nombre, descripcion, fecha, area, lugar });
        res.redirect('/actividades');
    } catch (error) {
        console.error('Error creating activity:', error);
        res.render('actividades/crear', {
            error: 'Error al guardar la actividad. Verifica los datos.',
            datos: req.body,
            areas: AREAS
        });
    }
};

// UPDATE - Show edit form
export const showEditForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) { res.status(404).render('404'); return; }
        res.render('actividades/editar', { actividad: activity, areas: AREAS });
    } catch (error) {
        console.error('Error fetching activity for edit:', error);
        res.status(500).render('500', { message: 'Error loading activity' });
    }
};

// UPDATE - Process update
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, descripcion, fecha, area, lugar } = req.body;
        await Activity.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, fecha, area, lugar },
            { new: true, runValidators: true }
        );
        res.redirect('/actividades');
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).render('500', { message: 'Error updating activity' });
    }
};

// DELETE - Remove activity
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.redirect('/actividades');
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).render('500', { message: 'Error deleting activity' });
    }
};

// QUERY - Search activities by area
export const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const { area } = req.query as { area?: string };
        const query = area && area !== 'Todas' ? { area } : {};
        const activities = await Activity.find(query).sort({ fecha: -1 });
        res.render('actividades/consulta', {
            actividades: activities,
            areas: AREAS,
            areaSeleccionada: area || 'Todas'
        });
    } catch (error) {
        console.error('Error in activity search:', error);
        res.status(500).render('500', { message: 'Error in search' });
    }
};
