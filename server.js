// Imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupDatabase, testConnection } from './src/models/setup.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { caCert } from './src/models/db.js';
import { startSessionCleanup } from './src/utils/session-cleanup.js';


//const name = process.env.NAME; // <-- NEW

/**
 * Declare Important Variables
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || 3000;
/**
 * Setup Express Server
 */
const app = express();

// Initialize PostgreSQL session store
const pgSession = connectPgSimple(session);

// Configure session middleware
app.use(session({
    store: new pgSession({
        conObject: {
            connectionString: process.env.DB_URL,
            // Configure SSL for session store connection (required by BYU-I databases)
            ssl: {
                ca: caCert,
                rejectUnauthorized: true,
                checkServerIdentity: () => { return undefined; }
            }
        },
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: NODE_ENV.includes('dev') !== true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Start automatic session cleanup
startSessionCleanup();

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Declare Routes
 */
app.get('/', (req, res) => {
    const title = 'Welcome Home';
    res.render('home', { title });
});
app.get('/categories', (req, res) => {
    const title = 'Categories';
    res.render('categories', { title });
});
app.get('/details', (req, res) => {
    const title = 'Our Products';
    res.render('details', { title });
});

// Start the server and listen on the specified port
app.listen(PORT, async () => {
    await setupDatabase();
    await testConnection();
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});