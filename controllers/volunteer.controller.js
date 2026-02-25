const Volunteer = require('../models/Volunteer');

// READ - Get all volunteers
exports.getAll = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ apellido: 1 });
        res.render('voluntarios/index', { voluntarios: volunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).render('500', { message: 'Error loading volunteers' });
    }
};

// CREATE - Show create form
exports.showCreateForm = (req, res) => {
    res.render('voluntarios/crear', { error: null, datos: {} });
};

// CREATE - Process new volunteer
exports.create = async (req, res) => {
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
exports.showEditForm = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).render('404');
        res.render('voluntarios/editar', { voluntario: volunteer });
    } catch (error) {
        console.error('Error fetching volunteer for edit:', error);
        res.status(500).render('500', { message: 'Error loading volunteer' });
    }
};

// UPDATE - Process update
exports.update = async (req, res) => {
    try {
        const { nombre, apellido, cedula, telefono, profesion, disponibilidad } = req.body;
        await Volunteer.findByIdAndUpdate(req.params.id,
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
exports.remove = async (req, res) => {
    try {
        await Volunteer.findByIdAndDelete(req.params.id);
        res.redirect('/voluntarios');
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).render('500', { message: 'Error deleting volunteer' });
    }
};
