import { Router } from 'express';
import * as ctrl from '../controllers/volunteer.controller';

const router = Router();

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

export default router;
