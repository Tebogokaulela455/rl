// routes/applications.js
const router = require('express').Router();
const { apply, list, approve } = require('../controllers/applicationsController');
const { verifyAdmin } = require('../middleware/adminAuth');
router.post('/', apply);
router.get('/', verifyAdmin, list);
router.post('/:id/approve', verifyAdmin, approve);
module.exports = router;
