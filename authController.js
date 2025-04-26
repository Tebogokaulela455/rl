// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));
const SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exists = db.get('users').find({ email }).value();
  if (exists) return res.status(400).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const studentNumber = 'NCU' + Date.now();
  db.get('users')
    .push({ fullName, email, password: hash, studentNumber, approved: false })
    .write();
  res.json({ studentNumber, message: 'Registered. Await approval.' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find({ email }).value();
  if (!user) return res.status(400).json({ message: 'Invalid creds' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid creds' });
  if (!user.approved) return res.status(403).json({ message: 'Await approval' });
  const token = jwt.sign({ email: user.email, role: 'user' }, SECRET);
  res.json({ token, studentNumber: user.studentNumber });
};
