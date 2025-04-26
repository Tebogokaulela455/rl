// controllers/applicationsController.js
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));

exports.apply = (req, res) => {
  const { course, qualification, email, motivation } = req.body;
  const id = Date.now().toString();
  db.get('applications')
    .push({ id, course, qualification, email, motivation, approved: false, date: new Date().toISOString() })
    .write();
  res.json({ message: 'Application received. Await approval.' });
};

exports.list = (req, res) => {
  res.json(db.get('applications').value());
};

exports.approve = (req, res) => {
  const { id } = req.params;
  db.get('applications').find({ id }).assign({ approved: true }).write();
  res.json({ message: 'Application approved' });
};
