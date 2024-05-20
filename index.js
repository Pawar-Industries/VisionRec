const express = require('express');
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const configRoutes = require('./src/routes');
const dbConnection = require('./src/config/mongodb/mongoConnection');

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Session middleware
app.use(
  session({
    name: "AuthCookie",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 86400000 },
  })
);

// Initialize MongoDB connection
dbConnection.dbConnection()
  .then(() => {
    console.log('MongoDB connected');

    // Routes
    configRoutes(app);

    // Error handling
    app.use((req, res) => {
        res.status(404).json({ error: 'Route not found' });
    });

    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process if MongoDB connection fails
  });