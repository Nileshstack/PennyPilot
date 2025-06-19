const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'https://pennypilot-jlfq.onrender.com',  // ✅ New frontend
  'http://localhost:3000'
];

// ✅ CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Handle preflight requests
app.options('*', cors(corsOptions));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transections', require('./routes/transectionRoutes'));

// Serve React frontend
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Node server is running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`);
});
