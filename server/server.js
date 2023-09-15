// server.js
const app = require('./app');
const connectDB = require('./db/db');

// Connect to MongoDB
connectDB();

// Set the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
