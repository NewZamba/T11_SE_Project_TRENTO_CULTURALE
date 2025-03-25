// tests/api.test.js
const request = require('supertest');
require('dotenv').config(); // Carica il file .env
const app = require('../app'); // Assumendo che 'app' sia l'esportazione del file che contiene il setup di Express
const mongoose = require('mongoose');

// Prima di tutto: connettiti al DB
beforeAll(async () => {
    const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // Imposta l'URI del database
    await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Chiudi il DB dopo tutti i test
afterAll(async () => {
    await mongoose.connection.close();
});
// Suite di test per GET /events
describe('GET /events', () => {
    it('Dovrebbe restituire tutti gli eventi', async () => {
        const res = await request(app).get('/events/get'); // Simula una richiesta GET
        expect(res.statusCode).toBe(200); // Assumiamo che lo status code previsto sia 200
        expect(Array.isArray(res.body)).toBe(true); // Controlla che il corpo della risposta sia un array
    });
    it('Dovrebbe restituire gli eventi ancora validi', async () => {
        const res = await request(app).get('/events/not_expired');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
});

//Test Login
describe('POST /auth/login',()=>{
    it("Dovrebbe loggarsi con le credenziali utente", async () => {
        const res = await request(app).post('/auth/login').send({
            email_user: 'a@a.a',
            pass_user: 'a'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.type_user).toBeDefined();
    })
    it("Dovrebbe dare errore con credenziali sbagliate", async ()=>{
        const res = await request(app).post('/auth/login').send({
            email_user: 'wrong@test.com',
            pass_user: 'wrong'
        });
        expect(res.statusCode).toBe(401);
    })
})



