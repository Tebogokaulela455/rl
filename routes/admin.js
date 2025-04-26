// routes/admin.js
const router = require('express').Router();
const { login, users, approveUser, changePassword } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/adminAuth');
router.post('/login', login);
router.get('/users', verifyAdmin, users);
router.post('/users/:studentNumber/approve', verifyAdmin, approveUser);
router.post('/change-password', verifyAdmin, changePassword);
module.exports = router;
