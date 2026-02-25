const Attendance = require('../models/Attendance');
const Beneficiary = require('../models/Beneficiary');
const Activity = require('../models/Activity');

// READ - Get all attendance records
exports.getAll = async (req, res) => {
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
exports.showCreateForm = async (req, res) => {
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
exports.create = async (req, res) => {
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
exports.showEditForm = async (req, res) => {
    try {
        const [record, beneficiaries, activities] = await Promise.all([
            Attendance.findById(req.params.id),
            Beneficiary.find().sort({ apellido: 1 }),
            Activity.find().sort({ nombre: 1 })
        ]);
        if (!record) return res.status(404).render('404');
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
exports.update = async (req, res) => {
    try {
        const { beneficiario, actividad, fechaAsistencia, observacion } = req.body;
        await Attendance.findByIdAndUpdate(req.params.id,
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
exports.remove = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.redirect('/asistencias');
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).render('500', { message: 'Error deleting record' });
    }
};
