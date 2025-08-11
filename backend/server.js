// -------------------- server.js --------------------
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

