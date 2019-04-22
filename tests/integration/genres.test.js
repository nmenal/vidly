const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
let server;
describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    });

    let token, name;

    function exec() {
        return request(server)
            .post('/api/genres/')
            .set('x-auth-token', token)
            .send({ name });
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
        name = 'genre1';
    });
    describe('GET /', () => {
        it('should get all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });
    describe('GET /:id', () => {
        it('should retrun the genre with given id', async () => {
            const g = new Genre({ name: 'genre1' });
            const genre = await g.save();
            const res = await request(server).get(`/api/genres/${genre.id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', genre.id);
        });
    });
    describe('GET /:id', () => {
        it('should retrun 404 if no genre found with given id', async () => {
            const res = await request(server).get(`/api/genres/1`);
            expect(res.status).toBe(404);
        });
    });
    describe('POST /', () => {
        it('should retrun 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should retrun 400 if genre is less than 5 characters', async () => {
            name = '1234'
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should retrun 400 if genre is more than 50 characters', async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should save the genre if it is valid', async () => {
            await exec();
            const genre = Genre.find({ name: 'genre1' });
            expect(genre).not.toBeNull();
        });
        it('should return the genre if it is valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});