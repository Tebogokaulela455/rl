// controllers/adminController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));
const SECRET = process.env.JWT_SECRET || 'secret';

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = db.get('admin').value();
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok || username !== admin.username) return res.status(400).json({ message: 'Invalid admin creds' });
  const token = jwt.sign({ role: 'admin' }, SECRET);
  res.json({ token });
};

exports.users = (req, res) => {
  res.json(db.get('users').value());
};

exports.approveUser = (req, res) => {
  const { studentNumber } = req.params;
  db.get('users').find({ studentNumber }).assign({ approved: true }).write();
  res.json({ message: 'User approved' });
};

exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);
  db.set('admin.passwordHash', hash).write();
  res.json({ message: 'Admin password updated' });
};
