const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: 'https://pennypilot-dtxb.onrender.com', 
  credentials: true,
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transections', require('./routes/transectionRoutes'));

// Serve static frontend (React)
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Node server is running In ${process.env.DEV_MODE} mode on port on ${process.env.PORT}`);
});
