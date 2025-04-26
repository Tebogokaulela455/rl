// middleware/adminAuth.js
const { verifyUser } = require('./auth');

exports.verifyAdmin = [verifyUser, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}];
