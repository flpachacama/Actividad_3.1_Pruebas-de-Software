const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Crear un libro
router.post('/', async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const book = await Book.create({ title, author, year });
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un libro por ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un libro
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        const { title, author, year } = req.body;
        book.title = title;
        book.author = author;
        book.year = year;

        await book.save();
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        await book.destroy();
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
