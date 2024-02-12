const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const version = require('../package.json').version;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management System API Docs',
            version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['./routes/*.js', './model/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = (app, port) => {
    // Swagger UI Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // Swagger API Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    })

    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}