const request = require('supertest');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');

describe('auth middlware', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        await Genre.remove({});
        server.close(); 
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres/')
            .set('x-auth-token', token)
            .send({ name :'genre1'});
    };

    beforeEach(() => { token = new User().generateAuthToken(); });

    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    it('should return 400 if no token is invalid', async () => {
        token = 'm';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 200 if a valid token is given', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
})