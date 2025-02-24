require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require ("./routes/bookRoutes");
const ordinaryLevelPassRoutes = require('./routes/ordinaryLevelPassRoutes');
const advancedLevelPassRoutes = require('./routes/advancedLevelPassRoutes');
const requestRoutes = require("./routes/requestRoutes");


app.use("/admins", adminRoutes);
app.use("/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use('/uploads', express.static('uploads'));

app.use('/api/ordinary-level-pass', ordinaryLevelPassRoutes);
app.use('/api/advanced-level-pass',advancedLevelPassRoutes);
app.use('/api/requests', requestRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
