const request = require('supertest');
const app = require('../index'); 

describe('Books API', () => {
  it('should return all books (GET /api/books)', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new book (POST /api/books)', async () => {
    const newBook = {
      title: 'El Aleph',
      author: 'Jorge Luis Borges',
      year: 1945
    };

    const res = await request(app)
      .post('/api/books')
      .send(newBook);
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newBook.title);
  });

  it('should update a book (PUT /api/books/:id)', async () => {
    const updatedBook = {
      title: 'El Aleph (Updated)',
      author: 'Jorge Luis Borges',
      year: 1945
    };

    const res = await request(app)
      .put('/api/books/1')  // Reemplaza con un ID válido
      .send(updatedBook);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedBook.title);
  });

  it('should delete a book (DELETE /api/books/:id)', async () => {
    const res = await request(app)
      .delete('/api/books/1');  // Reemplaza con un ID válido

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });
});
