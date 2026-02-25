const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/beneficiary.controller');

// READ   - List all
router.get('/', ctrl.getAll);

// CREATE - Show form
router.get('/crear', ctrl.showCreateForm);
// CREATE - Process form
router.post('/crear', ctrl.create);

// UPDATE - Show edit form
router.get('/editar/:id', ctrl.showEditForm);
// UPDATE - Process update
router.post('/editar/:id', ctrl.update);

// DELETE - Remove record
router.post('/eliminar/:id', ctrl.remove);

// QUERY  - Custom search
router.get('/consulta', ctrl.search);

module.exports = router;
