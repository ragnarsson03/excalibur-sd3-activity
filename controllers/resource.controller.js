const Resource = require('../models/Resource');

// READ - Get all resources
exports.getAll = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ nombre: 1 });
        res.render('recursos/index', { recursos: resources });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).render('500', { message: 'Error loading resources' });
    }
};

// CREATE - Show create form
exports.showCreateForm = (req, res) => {
    res.render('recursos/crear', { error: null, datos: {} });
};

// CREATE - Process new resource
exports.create = async (req, res) => {
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
exports.showEditForm = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).render('404');
        res.render('recursos/editar', { recurso: resource });
    } catch (error) {
        console.error('Error fetching resource for edit:', error);
        res.status(500).render('500', { message: 'Error loading resource' });
    }
};

// UPDATE - Process update
exports.update = async (req, res) => {
    try {
        const { nombre, tipo, cantidad, estado } = req.body;
        await Resource.findByIdAndUpdate(req.params.id,
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
exports.remove = async (req, res) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.redirect('/recursos');
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).render('500', { message: 'Error deleting resource' });
    }
};
