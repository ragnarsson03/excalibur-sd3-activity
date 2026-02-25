const Activity = require('../models/Activity');

// READ - Get all activities
exports.getAll = async (req, res) => {
    try {
        const activities = await Activity.find().sort({ fecha: -1 });
        res.render('actividades/index', { actividades: activities });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).render('500', { message: 'Error loading activities' });
    }
};

// CREATE - Show create form
exports.showCreateForm = (req, res) => {
    res.render('actividades/crear', { error: null, datos: {} });
};

// CREATE - Process new activity
exports.create = async (req, res) => {
    try {
        const { nombre, descripcion, fecha, area, lugar } = req.body;
        await Activity.create({ nombre, descripcion, fecha, area, lugar });
        res.redirect('/actividades');
    } catch (error) {
        console.error('Error creating activity:', error);
        res.render('actividades/crear', {
            error: 'Error al guardar la actividad. Verifica los datos.',
            datos: req.body
        });
    }
};

// UPDATE - Show edit form
exports.showEditForm = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).render('404');
        res.render('actividades/editar', { actividad: activity });
    } catch (error) {
        console.error('Error fetching activity for edit:', error);
        res.status(500).render('500', { message: 'Error loading activity' });
    }
};

// UPDATE - Process update
exports.update = async (req, res) => {
    try {
        const { nombre, descripcion, fecha, area, lugar } = req.body;
        await Activity.findByIdAndUpdate(req.params.id,
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
exports.remove = async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.redirect('/actividades');
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).render('500', { message: 'Error deleting activity' });
    }
};

// QUERY - Search activities by area
exports.search = async (req, res) => {
    try {
        const { area } = req.query;
        const query = area && area !== 'Todas' ? { area } : {};
        const activities = await Activity.find(query).sort({ fecha: -1 });
        const areas = ['Salud', 'Educación', 'Cultura', 'Deporte', 'Social'];
        res.render('actividades/consulta', { actividades: activities, areas, areaSeleccionada: area || 'Todas' });
    } catch (error) {
        console.error('Error in activity search:', error);
        res.status(500).render('500', { message: 'Error in search' });
    }
};
