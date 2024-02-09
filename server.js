require('dotenv').config();

const express = require('express');

const app = express();

const { db } = require('./connection/mongoDb');

const authRoutes = require('./routes/auth');
const authorRoutes = require('./routes/author');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.get('/', (req, res) => {
    return res.send('Welcome to easyfundraising Library Management System Service');
});

app.use('/api/auth', authRoutes);
app.use('/api/author', authorRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong, please try again';
    console.log(
        `Request failed with status code: ${statusCode} and message: ${message} at path: ${req.originalUrl}`
    );
    return res.status(statusCode).json({
        message,
        status: false,
        data: null,
    });
});

db.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on ${process.env.PORT}`);
    });
});

process.on('SIGINT', async () => {
    process.exit(0);
});