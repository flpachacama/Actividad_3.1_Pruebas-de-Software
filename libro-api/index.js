// index.js
const express = require('express');
const sequelize = require('./config/database');
const booksRouter = require('./routes/books');
const app = express();
const port = 3000;

// Middleware para leer JSON
app.use(express.json());

// Usar las rutas de libros
app.use('/api/books', booksRouter);

// Sincronizar la base de datos (crear tablas si no existen)
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
