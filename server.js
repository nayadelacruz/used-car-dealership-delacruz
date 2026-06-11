// Imports
import express from 'express';

const name = process.env.NAME; // <-- NEW

app.get('/', (req, res) => {
    res.send(`Welcome, ${name}!`); // <-- UPDATED
});

/**
 * Declare Important Variables
 */
const PORT = process.env.PORT || 3000;

/**
 * Setup Express Server
 */
const app = express();

/**
 * Declare Routes
 */

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});