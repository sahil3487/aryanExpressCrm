

const express = require('express');
const cors = require('cors');
const app = express();

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
 
// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON bodies 
app.use(express.json());

// Example route
app.post('/api/v1/registerEmployee', (req, res) => {
    // Your handler code here
    res.json({ message: 'Employee registered successfully!' });
});

// Start server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
