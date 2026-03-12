const express = require('express');
const cors = require('cors');
require('dotenv').config();

const diagnoseRoute = require('./routes/diagnose');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/diagnose', diagnoseRoute);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PetaniPintar backend is running! 🌱' });
});

// Error handler — always last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});