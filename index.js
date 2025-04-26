// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const appRoutes = require('./routes/applications');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`NCU TVET API listening on port ${PORT}`);
});
