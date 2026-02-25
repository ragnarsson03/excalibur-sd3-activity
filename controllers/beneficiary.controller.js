const Beneficiary = require('../models/Beneficiary');

// READ - Get all beneficiaries
exports.getAll = async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
        res.render('beneficiarios/index', { beneficiarios: beneficiaries });
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).render('500', { message: 'Error loading beneficiaries' });
    }
};

// CREATE - Show create form
exports.showCreateForm = (req, res) => {
    res.render('beneficiarios/crear', { error: null, datos: {} });
};

// CREATE - Process new beneficiary
exports.create = async (req, res) => {
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
exports.showEditForm = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id);
        if (!beneficiary) return res.status(404).render('404');
        res.render('beneficiarios/editar', { beneficiario: beneficiary });
    } catch (error) {
        console.error('Error fetching beneficiary for edit:', error);
        res.status(500).render('500', { message: 'Error loading beneficiary' });
    }
};

// UPDATE - Process update
exports.update = async (req, res) => {
    try {
        const { nombre, apellido, cedula, fechaNacimiento, direccion, telefono } = req.body;
        await Beneficiary.findByIdAndUpdate(req.params.id,
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
exports.remove = async (req, res) => {
    try {
        await Beneficiary.findByIdAndDelete(req.params.id);
        res.redirect('/beneficiarios');
    } catch (error) {
        console.error('Error deleting beneficiary:', error);
        res.status(500).render('500', { message: 'Error deleting beneficiary' });
    }
};

// QUERY - Search beneficiaries by cedula or name
exports.search = async (req, res) => {
    try {
        const { q } = req.query;
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
