const mongoose = require('mongoose');
const request = require('supertest');
const { Genre } = require('../../models/genre');
let server;
describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    });
    describe('GET /', () => {
        it('should get all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])
            //
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name ==='genre1')).toBeTruthy();
            expect(res.body.some(g => g.name ==='genre2')).toBeTruthy();
        });
    });
    describe('GET /:id', () => {
        it('should retrun the genre with given id', async () => {
            //add a new genre
            const g = new Genre({ name: 'genre1' });
            const genre = await g.save();
            const res = await request(server).get(`/api/genres/${genre.id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id',genre.id);

        });
    });
    describe('GET /:id', () => {
        it('should retrun 404 if no genre found with given id', async () => {
            //add a new genre
            // const _id =  new mongoose.Types.ObjectId().toHexString();
            const res = await request(server).get(`/api/genres/1`);
            expect(res.status).toBe(404);
            // expect(res.body).toHaveProperty('_id',genre.id);

        });
    });
});